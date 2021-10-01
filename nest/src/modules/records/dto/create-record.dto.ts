import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { RecordType } from '../record.entity';

export class CreateRecordDto {
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
  @ValidateIf(record => record.type !== RecordType.TRANSFER)
  accountIdTo: string;

  @IsString()
  @ValidateIf(record => record.type !== RecordType.TRANSFER)
  categoryId: string;

  @IsOptional()
  labels: string[];
}
