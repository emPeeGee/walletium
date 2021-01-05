import { IsString, IsHexColor, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
}
