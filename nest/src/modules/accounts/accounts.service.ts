import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Account, CurrencyType } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccount } from './interfaces/account.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
    private usersService: UsersService,
  ) {}

  async findAllByUserId(userId: string): Promise<Account[]> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    return await this.repository.find({ user });
  }

  async findOne(accountId: string): Promise<Account> {
    return await this.repository.findOne({ id: accountId });
  }

  async create(createAccount: CreateAccountDto): Promise<any> {
    const user = await this.usersService.findById(createAccount.userId);

    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    const suchAccount = await this.repository.findOne({
      name: createAccount.name,
    });

    if (suchAccount) {
      throw new BadRequestException('Such account already exists!');
    }

    const accountToSave: IAccount = {
      ...createAccount,
      currency: createAccount.currency as CurrencyType,
      user,
    };

    const createdAccount = await this.repository.save(accountToSave);
    const { user: ommitedUser, ...sendedAccount } = createdAccount;

    return sendedAccount;
  }

  async update(updateAccount: UpdateAccountDto): Promise<any> {
    const user = await this.usersService.findById(updateAccount.userId);

    if (!user) {
      throw new BadRequestException('Such user does not exists!');
    }

    const accountToSave: IAccount = {
      ...updateAccount,
      currency: updateAccount.currency as CurrencyType,
      user,
    };

    const createdAccount = await this.repository.save(accountToSave);
    const { user: ommitedUser, ...sendedAccount } = createdAccount;

    return sendedAccount;
  }

  async delete(accountId: string): Promise<any> {
    const account = await this.repository.findOne({ id: accountId });

    if (!account) {
      throw new BadRequestException('Such account does not exists!');
    }

    return await this.repository.delete(account);
  }
}
