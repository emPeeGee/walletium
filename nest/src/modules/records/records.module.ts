import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { LabelsModule } from '../labels/labels.module';
import { Record } from './record.entity';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), CategoriesModule, AccountsModule, LabelsModule],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
