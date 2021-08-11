import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/passport/jwt-auth.guard';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { IRecordFrontend } from './interfaces/record.interface';
import { Record } from './record.entity';
import { RecordsService } from './records.service';

@ApiTags('Records')
@Controller('api/records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<IRecordFrontend[]> {
    return this.recordsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') recordId: string): Promise<IRecordFrontend> {
    return this.recordsService.findOne(recordId);
  }

  @Get('getByAccount/:id')
  @UseGuards(JwtAuthGuard)
  async findByAccount(@Param('id') accountId: string): Promise<IRecordFrontend[]> {
    return this.recordsService.findByAccount(accountId);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  public async create(@Body() createRecord: CreateRecordDto): Promise<Record> {
    const record = this.recordsService.create(createRecord);
    return record;
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  public async update(@Body() updateRecordDto: UpdateRecordDto): Promise<Record> {
    const record = this.recordsService.update(updateRecordDto);
    return record;
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') recordId: string): Promise<any> {
    const record = this.recordsService.delete(recordId);
    return record;
  }
}
