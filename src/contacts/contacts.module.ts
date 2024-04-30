import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ContactBook } from './entities/contact-book.entity';
import { PhoneNumber } from '../../src/phone-numbers/entities/phone-number.entity';
import { User } from '../../src/users/entities/user.entity';
// import { User } from '../../src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, ContactBook, PhoneNumber, User]),
    AuthModule,
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule { }
