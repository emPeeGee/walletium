import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  color: string;

  @IsNotEmpty()
  userId: string;
}
