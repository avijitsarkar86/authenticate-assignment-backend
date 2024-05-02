import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PhoneNumber } from 'src/phone-numbers/entities/phone-number.entity';
import { ContactBook } from './entities/contact-book.entity';
import { ICurrentUser } from 'src/decorators/current-user.decorator';
import { CreateSpamDto } from './dto/create-spam.dto';

const DEFAULT_LIMIT = 50;

export interface ContactByNumber {
  name: string;
  countryCode: string | number;
  phoneNumber: string | number;
  spamCount: number;
  numberId: number;
  userId?: number;
  matchScore?: number;
}

export interface IDetailsResponse extends PhoneNumber {
  name: string;
  email?: string;
}

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactBook) private cbRepo: Repository<ContactBook>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PhoneNumber) private pnRepo: Repository<PhoneNumber>,
  ) {}

  async findContactsByName(name: string) {
    try {
      const result = await this.cbRepo
        .createQueryBuilder('cb')
        .where('cb.name LIKE :name', { name: `%${name}%` })
        .select(['cb.*', `LOCATE('${name}', name) as matchScore`])
        .orderBy('matchScore')
        .limit(DEFAULT_LIMIT)
        .getRawMany();

      return {
        searchParam: name,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async findContactsByNumber(number: string) {
    try {
      const isRegisteredNumber = await this.getRegisteredNumber(number);
      let response: ContactByNumber[] = [];
      //===== returning only registered number if found exact match
      if (isRegisteredNumber) {
        response.push(isRegisteredNumber);
        return { srch: number, data: response };
      }
      // ====== returning all matched number
      else {
        response = await this.cbRepo
          .createQueryBuilder('cb')
          .select([
            'cb.name as name',
            'cb.countryCode as countryCode',
            'cb.phoneNumber as phoneNumber',
            'cb.spamCount as spamCount',
            'cb.id as numberId',
            `LOCATE('${number}', CONCAT(cb.countryCode, cb.phoneNumber)) as matchScore`,
          ])
          .where('CONCAT(cb.countryCode, cb.phoneNumber) LIKE :number', {
            number: `%${number}%`,
          })
          .orderBy('matchScore')
          .limit(DEFAULT_LIMIT)
          .getRawMany();
      }

      return { srch: number, data: response };
    } catch (error) {
      throw error;
    }
  }

  async getContactDetails(numberId: string, currentUser: ICurrentUser) {
    try {
      const id = parseInt(numberId);
      let details: Partial<IDetailsResponse> = await this.pnRepo.findOneBy({
        id,
      });
      if (details) {
        // ==== user is not registered
        if (!details.isRegistered) {
          const name = (await this.cbRepo.findOneBy({ id })).name;
          details = { ...details, name };
        }
        // ===== user is registered
        else {
          const u_det = await this.userRepo
            .createQueryBuilder('u')
            .select([
              'u.name as name',
              'u.id as uId',
              `(
                CASE
                  WHEN (u.id = ${currentUser.userId}) THEN u.email
                  WHEN (SELECT COUNT(c.id) FROM contact c WHERE c.contactOfUserId = u.id AND c.numberId = ${currentUser.numberId}) > 0 THEN u.email
                  ELSE null
                END
              ) as uEmail`,
            ])
            .where('u.number = :id', { id })
            .getRawOne();
          details = {
            ...details,
            email: u_det.uEmail || null,
            name: u_det.name,
          };
        }

        return { contactDetails: details };
      }
      return new NotFoundException('contact not found');
    } catch (error) {
      throw error;
    }
  }

  async markContactAsSpam(requestBody: CreateSpamDto, currentUser: User) {
    try {
      const { countryCode, phoneNumber } = requestBody;
      let isNewRecord: boolean = false;
      let message = 'number successfully marked as spam';
      let number = await this.getNumber(countryCode, phoneNumber);

      if (number) {
        // ====== check if already spammed by the logged in user
        const spammedByMe = number.spammedBy.findIndex(
          (spb) => spb.id === currentUser.id,
        );
        if (spammedByMe > -1) {
          message = 'number already spammed by you';
        } else {
          number.spamCount = ++number.spamCount;
          number.spammedBy.push(currentUser);
          await this.pnRepo.save(number);
        }
      } else {
        // ====== NUMBER DOES NOT EXISTS - CREATING NEW RECORD
        number = this.pnRepo.create({
          countryCode,
          phoneNumber,
          spamCount: 1,
          spammedBy: [currentUser],
        });
        await this.pnRepo.save(number);
        isNewRecord = true;
      }
      return {
        message: message,
        countryCode,
        phoneNumber,
        isNewRecord,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * PRIVATE FUNCTIONS
   */
  private async getRegisteredNumber(number: string) {
    try {
      const result = await this.userRepo
        .createQueryBuilder('u')
        .select([
          'u.name as name',
          'u.numberId as numberId',
          'u.id as userId',
          'n.countryCode as countryCode',
          'n.phoneNumber as phoneNumber',
          'n.spamCount as spamCount',
        ])
        .innerJoin('u.number', 'n', 'u.numberId = n.id')
        .where('CONCAT(n.countryCode, n.phoneNumber) = :number', { number })
        .andWhere('n.isRegistered = :isRegistered', { isRegistered: true })
        .getRawOne();
      return result;
    } catch (error) {
      throw error;
    }
  }

  private getNumber(countryCode: number, phoneNumber: number) {
    return this.pnRepo.findOne({
      relations: {
        spammedBy: true,
      },
      where: {
        countryCode,
        phoneNumber,
      },
    });
  }
}
