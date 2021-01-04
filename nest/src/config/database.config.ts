import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Label } from 'src/modules/labels/labels.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'WALLETIUM',
  entities: [Label],
  synchronize: true,
};
