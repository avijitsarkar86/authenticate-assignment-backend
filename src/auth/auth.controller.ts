import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';

const __EMAIL = 'test@test.com';
const __PASS = 'password';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, countryCode, phoneNumber, password } = body;
    // const token = await this.authService.signup(__EMAIL, __PASS);
    const token = await this.authService.signup(body);
    return token;
  }

  // @Post('/login')
  // async signin(@Body() body: CreateUserDto) {
  //   // const user = await this.authService.authenticate(body.email, body.password);
  //   const token = await this.authService.authenticate(__EMAIL, __PASS);
  //   // console.log('Controller :: token : ', token);
  //   return token;
  // }

  // @UseGuards(AuthGuard)
  // @Get('/whoami')
  // getProfile(@Request() req) {
  //   console.log('req.user : ', req.user);
  //   return req.user;
  // }
}
