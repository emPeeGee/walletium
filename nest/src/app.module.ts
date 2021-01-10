import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpLoggerMiddleware } from './common/middleware/http-logger.middleware';
import { CommonModule } from './common/common.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
