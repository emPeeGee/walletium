import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { RolesModule } from '../roles/roles.module';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, RolesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
