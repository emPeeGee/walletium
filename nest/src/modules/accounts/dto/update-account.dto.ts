import { IsString, IsHexColor, IsNumber } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsHexColor()
  color: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  userId: string;
}
