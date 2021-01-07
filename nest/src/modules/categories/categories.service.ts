import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interfaces/category.interface';
import { unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);
@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repository: Repository<Category>) {}

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.repository.findOne({ id });
  }

  async create(createCategory: CreateCategoryDto, file: any, host: string): Promise<Category> {
    const category: ICategory = {
      name: createCategory.name,
      imagePath: `http://${host}/images/categories/${file.filename}`,
    };

    const suchCategory = await this.repository.findOne({ name: category.name });

    if (suchCategory) {
      throw new BadRequestException('Such category already exists');
    }

    return await this.repository.save(category);
  }

  async update(updateCategory: UpdateCategoryDto, file: any, host: string): Promise<Category> {
    let oldImagePath = '';
    let imagePath = updateCategory.imagePath;
    if (file) {
      oldImagePath = imagePath.split('/').pop();
      imagePath = `http://${host}/images/categories/${file.filename}`;
    }

    const category: Category = {
      id: updateCategory.id,
      name: updateCategory.name,
      imagePath: imagePath,
    };

    const updatedCategory = await this.repository.save(category);

    if (oldImagePath) {
      await unlinkAsync(`public/images/categories/${oldImagePath}`);
    }

    return updatedCategory;
  }

  async delete(id: string): Promise<any> {
    const category = await this.repository.findOne({ id });

    if (!category) {
      throw new BadRequestException('Such category does not exists!');
    }

    const imageName = category.imagePath.split('/').pop();

    const deletedCategory = await this.repository.delete({ id });

    await unlinkAsync(`public/images/categories/${imageName}`);

    return deletedCategory;
  }
}
