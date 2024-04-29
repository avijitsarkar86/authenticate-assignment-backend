import { Injectable } from '@nestjs/common';
// import { CreateContactDto } from './dto/contact-search.dto';
import { SearchContactDto } from './dto/search-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PhoneNumber } from 'src/phone-numbers/entities/phone-number.entity';
import { ContactBook } from './entities/contact-book.entity';

// export interface SearchQueryParams {
//   name: string;
//   number: string;
// }

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactBook) private cbRepo: Repository<ContactBook>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PhoneNumber) private pnRepo: Repository<PhoneNumber>,
  ) {}

  async findContactsByName(name: string) {
    const result = await this.cbRepo
      .createQueryBuilder('cb')
      .where('cb.name LIKE :name', { name: `%${name}%` })
      .select(['cb.*', `LOCATE('${name}', name) as matchScore`])
      .orderBy('matchScore')
      .getRawMany();

    return {
      searchParam: name,
      data: result,
    };
  }

  async findContactsByNumber(number: string) {
    const contact = await this.pnRepo
      .createQueryBuilder('p')
      .select(['p.*'])
      .where('CONCAT(p.countryCode, p.phoneNumber) = :number', { number })
      .andWhere('isRegistered = true')
      .getRawOne();
    return {
      searchParam: number,
      data: contact,
    };
  }
}
