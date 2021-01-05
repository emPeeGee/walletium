import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LabelsModule } from './modules/labels/labels.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { SeedersModule } from './seeders/seeders.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from './config/config.module';
import { MulterConfigService } from './config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    AuthenticationModule,
    LabelsModule,
    UsersModule,
    SeedersModule,
    RolesModule,
    AccountsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
