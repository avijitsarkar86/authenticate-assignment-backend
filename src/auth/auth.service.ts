import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(requestBody: CreateUserDto) {
    const { countryCode, phoneNumber, password, email } = requestBody;
    // 1. check if phone number is already in use
    const isPhoneRegistered = this.userService.findRegisteredPhone(
      countryCode,
      phoneNumber,
    );
    return isPhoneRegistered;
    // 2. Hash the user's password
    // i. Generate a SALT
    // const salt = randomBytes(8).toString('hex');

    // // ii. Hash the SALT and password together
    // const hash = (await scrypt(password, salt, 32)) as Buffer;

    // // iii. Join the hashed result and the SALT together
    // const hashedPassword = salt + '.' + hash.toString('hex');

    // // 3. Create a new user and save in db
    // const user = await this.userService.create(email, hashedPassword);

    // // 4. Return access token
    // return user;
  }

  // async authenticate(
  //   email: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   const [user] = await this.userService.find(email);

  //   if (!user) {
  //     throw new UnauthorizedException('authentication failed');
  //   }

  //   const [salt, storedHash] = user.password.split('.');

  //   const hash = (await scrypt(password, salt, 32)) as Buffer;

  //   if (storedHash !== hash.toString('hex')) {
  //     throw new UnauthorizedException('authentication failed');
  //   }

  //   // return user;

  //   const token = await this.jwtService.signAsync(
  //     JSON.parse(JSON.stringify(user)),
  //   );
  //   // console.log('token : ', token);
  //   return {
  //     access_token: token,
  //   };
  // }
}
