import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PhoneNumber } from 'src/phone-numbers/entities/phone-number.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PhoneNumber) private numberRepo: Repository<PhoneNumber>,
  ) {}

  async create(
    countryCode: number,
    phoneNumber: number,
    password: string,
    name: string,
    email?: string,
  ) {
    try {
      // ===== check if the number is NOT registered
      let number = await this.findPhoneByRegistration(
        countryCode,
        phoneNumber,
        false,
      );

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

  async findRegisteredUser(countryCode: number, phoneNumber: number) {
    try {
      if (!countryCode || !phoneNumber) return null;

      const registeredPhone = await this.findPhoneByRegistration(
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

  findPhoneByRegistration(
    countryCode: number,
    phoneNumber: number,
    isRegistered = true,
  ) {
    if (!countryCode || !phoneNumber) return null;

    return this.numberRepo.findOneBy({
      countryCode,
      phoneNumber,
      isRegistered,
    });
  }
}
