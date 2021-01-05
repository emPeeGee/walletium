import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_super_password_to_change_in_future',
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.usersService.findByEmail(payload.user.email);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, user);
  }
}
