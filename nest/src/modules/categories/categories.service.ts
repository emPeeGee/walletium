import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  create(createCategory: CreateCategoryDto): Promise<Category> {
    let category: ICategory = {
      name: createCategory.name,
      imagePath: '',
    };

    return null;
  }

  update(updateCategory: UpdateCategoryDto): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}
