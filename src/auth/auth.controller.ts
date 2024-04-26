import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { LoginUserDto } from 'src/users/dtos/login-user-dto';

@ApiTags('auth')
// @UseFilters(HttpExceptionFilter)
@Controller('auth')
// @Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) { }


  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return { body };
    // return this.authService.signup(body);
  }

  // @Post('/login')
  // @HttpCode(200)
  // signin(@Body() body: LoginUserDto) {
  //   return this.authService.authenticate(body);
  // }

  // @UseGuards(AuthGuard)
  // @Get('/whoami')
  // getProfile(@Request() req) {
  //   console.log('req.user : ', req.user);
  //   return req.user;
  // }
}
