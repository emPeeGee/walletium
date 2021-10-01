import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from 'src/modules/accounts/account.entity';
import { Category } from 'src/modules/categories/category.entity';
import { Label } from 'src/modules/labels/labels.entity';
import { Role } from 'src/modules/roles/role.entity';
import { User } from 'src/modules/users/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'walletium',
  entities: [Label, User, Role, Account, Category],
  synchronize: true,
};
