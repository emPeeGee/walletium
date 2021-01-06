import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
@Controller('api/accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get('getByUser/:userId')
  async getByUser(@Param('userId') userId: string): Promise<Account[]> {
    return await this.accountsService.findAllByUserId(userId);
  }

  @Get('getOne/:accountId')
  async getOne(@Param('accountId') accountId: string): Promise<Account> {
    return await this.accountsService.findOne(accountId);
  }

  @Post('create')
  async create(@Body() createAccount: CreateAccountDto): Promise<Account> {
    return await this.accountsService.create(createAccount);
  }

  @Put('update')
  async update(@Body() updateAccount: UpdateAccountDto): Promise<any> {
    return await this.accountsService.update(updateAccount);
  }

  @Delete('delete/:accountId')
  async delete(@Param('accountId') accountId: string): Promise<any> {
    return await this.accountsService.delete(accountId);
  }
}
