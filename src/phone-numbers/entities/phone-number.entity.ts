import { Contact } from 'src/contacts/entities/contact.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('UQ_NUMBER', ['countryCode', 'phoneNumber'])
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  countryCode: number;

  @Column({ type: 'bigint' })
  phoneNumber: number;

  @Column({ type: 'integer', default: 0 })
  spamCount: number;

  @Column({ default: false })
  isRegistered: boolean;

  @OneToMany(() => Contact, (contact) => contact.number, {
    nullable: true,
  })
  number: Contact[];
}
