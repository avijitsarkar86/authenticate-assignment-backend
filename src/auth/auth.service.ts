import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { LoginUserDto } from 'src/users/dtos/login-user-dto';

const scrypt = promisify(_scrypt);

interface TokenPayload {
  id: number;
  email?: string;
  number: {
    id: number;
    phoneNumber: number;
    countryCode: number;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(requestBody: CreateUserDto) {
    try {
      const { countryCode, phoneNumber, password, email, name } = requestBody;
      // 1. check if phone number is already in use
      const isPhoneRegistered = await this.userService.findPhoneByRegistration(
        countryCode,
        phoneNumber,
      );
      // return { isPhoneRegistered };
      if (isPhoneRegistered) {
        throw new BadRequestException('user already exists');
      }

      // 2. Hash the user's password
      // i. Generate a SALT
      const salt = randomBytes(8).toString('hex');

      // ii. Hash the SALT and password together
      const hash = (await scrypt(password, salt, 32)) as Buffer;

      // iii. Join the hashed result and the SALT together
      const hashedPassword = salt + '.' + hash.toString('hex');

      // 3. Create a new user and save in db
      const user = await this.userService.create(
        countryCode,
        phoneNumber,
        hashedPassword,
        name,
        email,
      );

      // return user;
      const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        number: {
          id: user.number.id,
          phoneNumber: user.number.phoneNumber,
          countryCode: user.number.countryCode,
        },
      };

      // 4. Return token
      return {
        message: 'successfully registered',
        access_token: await this.generateToken(payload),
      };
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'some error has occurred',
      );
    }
  }

  async authenticate(requestBody: LoginUserDto) {
    try {
      const { countryCode, phoneNumber, password } = requestBody;

      const user = await this.userService.findRegisteredUser(
        countryCode,
        phoneNumber,
      );

      console.log('user : ', user);

      if (!user) {
        throw new UnauthorizedException('authentication failed');
      }

      // return user;

      const [salt, storedHash] = user.password.split('.');

      const hash = (await scrypt(password, salt, 32)) as Buffer;

      if (storedHash !== hash.toString('hex')) {
        throw new UnauthorizedException('authentication failed');
      }

      const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        number: {
          id: user.number.id,
          phoneNumber: user.number.phoneNumber,
          countryCode: user.number.countryCode,
        },
      };

      return {
        message: 'successfully logged in',
        access_token: await this.generateToken(payload),
      };
    } catch (err) {
      throw err;
    }
  }

  private async generateToken(tokenPayload: TokenPayload) {
    try {
      const token = await this.jwtService.signAsync(
        JSON.parse(JSON.stringify(tokenPayload)),
      );
      // console.log('token : ', token);
      return token;
    } catch (err) {
      throw err;
    }
  }
}
