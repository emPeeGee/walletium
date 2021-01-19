import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './labels.entity';
import { LabelsService } from './labels.service';

@Controller('api/labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Get('getByUser/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Param('userId') userId: string): Promise<Label[]> {
    return this.labelsService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getOne(@Param('id') id: string): Promise<Label> {
    return this.labelsService.findOne(id);
  }

  @Post('create')
  create(@Body() createLabel: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabel);
  }

  @Put('update')
  update(@Body() updateLabel: UpdateLabelDto): Promise<Label> {
    return this.labelsService.update(updateLabel);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<Label> {
    return this.labelsService.delete(id);
  }
}
