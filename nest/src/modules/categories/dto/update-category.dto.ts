import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  imagePath: string;
}
