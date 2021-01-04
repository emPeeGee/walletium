import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelsController } from './labels.controller';
import { Label } from './labels.entity';
import { LabelsService } from './labels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
