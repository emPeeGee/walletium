import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LabelsModule } from './modules/labels/labels.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthenticationModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
