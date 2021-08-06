import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/passport/jwt-auth.guard';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './labels.entity';
import { LabelsService } from './labels.service';

@ApiTags('Labels')
@Controller('api/labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Get('getByUser/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Param('userId') userId: string): Promise<Label[]> {
    return this.labelsService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string): Promise<Label> {
    return this.labelsService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createLabel: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabel);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  update(@Body() updateLabel: UpdateLabelDto): Promise<Label> {
    return this.labelsService.update(updateLabel);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<Label> {
    return this.labelsService.delete(id);
  }
}
