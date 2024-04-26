import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  // constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  // create(countryCode: number, phoneNumber: number, password: string, email?: string) {
  //   const user = this.userRepo.create({ countryCode, phoneNumber, password, email });

  //   return this.userRepo.save(user);
  // }

  // findRegisteredPhone(countryCode: number, phoneNumber: number) {
  //   if (!countryCode || !phoneNumber) return null;

  //   return this.userRepo.findOneBy({ countryCode, phoneNumber });
  // }

  // findOne(id: string) {
  //   if (!id) {
  //     return null;
  //   }
  //   return this.userRepo.findOneBy({ id });
  // }

  // find(email: string) {
  //   return this.userRepo.find({ where: { email } });
  // }

  // async update(id: string, attrs: Partial<User>) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found!');
  //   }
  //   Object.assign(user, attrs);
  //   return this.userRepo.save(user);
  // }

  // async remove(id: string) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found!');
  //   }
  //   return this.userRepo.remove(user);
  // }
}
