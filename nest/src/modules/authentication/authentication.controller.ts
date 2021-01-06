import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('api/authentication')
export class AuthenticationController {
  constructor(private usersService: UsersService, private authenticationService: AuthenticationService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(@Request() request: any) {
    return this.authenticationService.createToken(request.user);
  }
}
