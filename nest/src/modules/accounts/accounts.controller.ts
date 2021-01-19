import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/passport/jwt-auth.guard';
import { Account } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
@Controller('api/accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get('getByUser/:userId')
  @UseGuards(JwtAuthGuard)
  async getByUser(@Param('userId') userId: string): Promise<Account[]> {
    return await this.accountsService.findAllByUserId(userId);
  }

  @Get('getOne/:accountId')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('accountId') accountId: string): Promise<Account> {
    return await this.accountsService.findOne(accountId);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAccount: CreateAccountDto): Promise<Account> {
    return await this.accountsService.create(createAccount);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateAccount: UpdateAccountDto): Promise<any> {
    return await this.accountsService.update(updateAccount);
  }

  @Delete('delete/:accountId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('accountId') accountId: string): Promise<any> {
    return await this.accountsService.delete(accountId);
  }
}
