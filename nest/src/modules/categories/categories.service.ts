import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MulterConfigService } from 'src/config/multer.config';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.repository.findOne({ id });
  }

  async create(
    createCategory: CreateCategoryDto,
    imagePath: string,
  ): Promise<Category> {
    let category: ICategory = {
      name: createCategory.name,
      imagePath: imagePath,
    };

    return await this.repository.save(category);
  }

  update(updateCategory: UpdateCategoryDto): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}
