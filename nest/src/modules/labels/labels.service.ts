import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { SaveLabel } from './interfaces/save-label.interface';
import { Label } from './labels.entity';

@Injectable()
export class LabelsService {
  constructor(@InjectRepository(Label) private repository: Repository<Label>, private usersService: UsersService) {}

  async findAllByUserId(userId: string): Promise<Label[]> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    const userLabels = await this.repository.find({ user });
    return userLabels;
  }

  async findOne(id: string): Promise<Label> {
    return this.repository.findOne(id);
  }

  async create(createLabel: CreateLabelDto): Promise<any> {
    const user = await this.usersService.findById(createLabel.userId);

    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    const suchLabel = await this.repository.findOne({
      name: createLabel.name,
      user: user,
    });

    if (suchLabel) {
      throw new BadRequestException('Such label already exists!');
    }

    const labelToSave: SaveLabel = {
      ...createLabel,
      user,
    };

    const createdLabel = await this.repository.save(labelToSave);
    const { user: ommitedUser, ...sendedLabel } = createdLabel;

    return sendedLabel;
  }

  async update(updateLabel: UpdateLabelDto): Promise<Label> {
    const user = await this.usersService.findById(updateLabel.userId);

    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    const suchLabel = await this.repository.findOne({
      name: updateLabel.name,
      user: user,
    });

    if (suchLabel) {
      throw new BadRequestException('Such label already exists!');
    }

    const updatedLabel = await this.repository.save(updateLabel);
    return updatedLabel;
  }

  async delete(id: string): Promise<Label> {
    const label = await this.repository.findOne(id);
    const deletedLabel = await this.repository.remove(label);
    return deletedLabel;
  }
}
