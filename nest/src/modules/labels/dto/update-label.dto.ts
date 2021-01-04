import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';

export class UpdateLabelDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
