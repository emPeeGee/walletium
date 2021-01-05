import { Logger, Module } from '@nestjs/common';
import { RolesModule } from 'src/modules/roles/roles.module';
import { SeedersService } from './seeders.service';

@Module({
  imports: [RolesModule],
  providers: [Logger, SeedersService],
})
export class SeedersModule {}
