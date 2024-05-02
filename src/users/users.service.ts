import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PhoneNumber } from '../../src/phone-numbers/entities/phone-number.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PhoneNumber) private numberRepo: Repository<PhoneNumber>,
  ) { }

  async create(
    countryCode: number,
    phoneNumber: number,
    password: string,
    name: string,
    email?: string,
  ) {
    try {
      let number = await this.findNotRegisteredPhone(countryCode, phoneNumber);

      if (!number) {
        number = this.numberRepo.create({
          countryCode,
          phoneNumber,
          isRegistered: true,
        });
      } else {
        number.isRegistered = true;
      }
      await this.numberRepo.save(number);

      const user = this.userRepo.create({ password, email, number, name });
      return this.userRepo.save(user);
    } catch (error) {
      throw error;
    }
  }

  // TODO START: code need to be re-factored

  findRegisteredPhone(countryCode: number, phoneNumber: number) {
    if (!countryCode || !phoneNumber) return null;

    return this.numberRepo.findOneBy({
      countryCode,
      phoneNumber,
      isRegistered: true,
    });
  }

  

  findNotRegisteredPhone(countryCode: number, phoneNumber: number) {
    if (!countryCode || !phoneNumber) return null;

    return this.numberRepo.findOneBy({
      countryCode,
      phoneNumber,
      isRegistered: false,
    });
  }

  // TODO END: code need to be re-factored

  async findRegisteredUser(countryCode: number, phoneNumber: number) {
    try {
      if (!countryCode || !phoneNumber) return null;

      const registeredPhone = await this.findRegisteredPhone(
        countryCode,
        phoneNumber,
      );
      if (registeredPhone) {
        // return this.userRepo.findOneBy({
        //   number: registeredPhone,
        // });
        return this.userRepo.findOne({
          where: { number: registeredPhone },
          relations: {
            number: true,
          },
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
