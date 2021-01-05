import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() request: any) {
    return this.authenticationService.createToken(request.user);
  }
}