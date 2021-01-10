import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';

@Module({
  providers: [EncryptionService, HttpLoggerMiddleware],
  exports: [EncryptionService, HttpLoggerMiddleware],
})
export class CommonModule {}
