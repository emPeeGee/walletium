import { Module } from '@nestjs/common';
import { MulterConfigService } from './multer.config';

@Module({
  providers: [MulterConfigService],
  exports: [MulterConfigService],
})
export class ConfigModule {}
