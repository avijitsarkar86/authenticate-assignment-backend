import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { PhoneNumber } from './phone-numbers/entities/phone-number.entity';
import { faker } from '@faker-js/faker';
import { Contact } from './contacts/entities/contact.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PhoneNumber) private pnRepo: Repository<PhoneNumber>,
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async generateUserRecord(count: number = 30) {
    try {
      let response = [];

      for (let i = 0; i < count; i++) {
        const phone_number = this.createRandomContact(true);
        if (await this.pnRepo.save(phone_number)) {
          const user = this.userRepo.create({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email().toLowerCase(),
            password:
              '0b9016e90272a0c3.7a4790d5b3a79f7b4f188fef4147a85465a98dfd5c75cb7b638514a05f2599bc', // 'password'
            number: phone_number,
          });

          /**
           * creating contact for the users
           */
          if (await this.userRepo.save(user)) {
            const contactCount = this.getRandomContactCount();
            if (contactCount > 0) {
              for (let j = 0; j < contactCount; j++) {
                const pn_contact = this.createRandomContact();
                if (await this.pnRepo.save(pn_contact)) {
                  const contact = this.contactRepo.create({
                    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                    number: pn_contact,
                    contactOfUser: user,
                  });
                  console.log('contact : ', contact);
                  await this.contactRepo.save(contact);
                }
              }
            }
            response.push({
              userId: user.id,
              email: user.email,
              numberId: phone_number.id,
              contact: {
                countryCode: phone_number.countryCode,
                number: phone_number.phoneNumber,
              },
              personalContactCount: contactCount,
            });
          }
        }
      }
      return {
        message: `total ${response.length} users created`,
        response,
      };
    } catch (error) {
      throw error;
    }
  }

  private createRandomContact(isRegistered = false) {
    return this.pnRepo.create({
      countryCode: faker.number.int({ min: 1, max: 998 }),
      phoneNumber: this.generateRandomPhoneNumber(),
      isRegistered,
    });
  }

  private generateRandomPhoneNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  private getRandomContactCount(max = 15) {
    return Math.floor(Math.random() * max);
  }
}
