import { IsString, IsHexColor, IsNumber } from 'class-validator';

export class CreateAccountDto {
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
