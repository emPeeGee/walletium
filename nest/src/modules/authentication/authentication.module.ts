import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { EncryptionService } from 'src/common/encryption.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret_super_password_to_change_in_future',
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    UsersModule,
    CommonModule,
  ],
  providers: [
    AuthenticationService,
    EncryptionService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [JwtModule],
})
export class AuthenticationModule {}
