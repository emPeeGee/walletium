import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './labels.entity';
import { LabelsService } from './labels.service';

@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Get()
  async getAll(): Promise<Label[]> {
    return this.labelsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Label> {
    return this.labelsService.findOne(id);
  }

  @Post('create')
  create(@Body() createLabel: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabel);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateLabel: UpdateLabelDto,
  ): Promise<Label> {
    return this.labelsService.update(id, updateLabel);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<Label> {
    return this.labelsService.delete(id);
  }
}
