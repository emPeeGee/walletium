import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RecordType } from '../record.entity';

export class UpdateRecordDto {
  @IsString()
  id: string;

  @IsEnum(RecordType)
  type: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  userChosenDate;

  @IsOptional()
  @IsString()
  payee: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  place: string;

  @IsString()
  accountId: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  labels: string[];
}
