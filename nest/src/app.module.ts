import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LabelsModule } from './modules/labels/labels.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RecordsModule } from './modules/records/records.module';
import { HttpLoggerMiddleware } from './common/middleware/http-logger.middleware';
import { CommonModule } from './common/common.module';
import { SeedersModule } from './seeders/seeders.module';
import { ConfigModule } from './config/config.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(databaseConfig),
    ServeStaticModule.forRoot({
      serveRoot: '/images/',
      rootPath: join(__dirname, '..', 'public', 'images'),
    }),
    MulterModule,
    AuthenticationModule,
    LabelsModule,
    UsersModule,
    SeedersModule,
    RolesModule,
    AccountsModule,
    CategoriesModule,
    CommonModule,
    RecordsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
