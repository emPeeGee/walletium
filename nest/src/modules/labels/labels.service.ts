import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './labels.entity';

@Injectable()
export class LabelsService {
  constructor(@InjectRepository(Label) private repository: Repository<Label>) {}

  findAll(): Promise<Label[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Label> {
    return this.repository.findOne(id);
  }

  async create(createLabel: CreateLabelDto): Promise<Label> {
    const createdLabel = await this.repository.save(createLabel);
    return createdLabel;
  }

  async update(id: string, updateLabel: UpdateLabelDto): Promise<Label> {
    const updatedLabel = await this.repository.save(updateLabel);
    return updatedLabel;
  }

  async delete(id: string): Promise<Label> {
    const label = await this.repository.findOne(id);
    const deletedLabel = await this.repository.remove(label);
    return deletedLabel;
  }
}
