import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer.config';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('categoryImage', MulterConfigService.createMulterOptions()),
  )
  create(
    @Body() createCategory: CreateCategoryDto,
    @UploadedFile() file,
  ): Promise<Category> {
    return this.categoriesService.create(createCategory, file.path);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(updateCategory);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete(id);
  }
}
