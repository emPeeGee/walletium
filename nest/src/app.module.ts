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

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthenticationModule,
    LabelsModule,
    UsersModule,
    SeedersModule,
    RolesModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
