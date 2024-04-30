import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhoneNumber } from '../../src/phone-numbers/entities/phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PhoneNumber])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
