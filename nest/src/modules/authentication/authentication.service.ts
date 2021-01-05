import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/common/encryption.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const matchPasswords = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (user && matchPasswords) {
      return user;
    }

    return null;
  }

  async createToken(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...cuttedUser } = user;
    console.log(user);

    return {
      success: true,
      user: cuttedUser,
      expiresIn: 3600,
      access_token:
        'Bearer ' +
        this.jwtService.sign({
          user,
        }),
    };
  }
}
