import { IsString, IsHexColor, IsNumber } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  imagePath: string;
}
