import { Contact } from 'src/contacts/entities/contact.entity';
import { PhoneNumber } from 'src/phone-numbers/entities/phone-number.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BeforeRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => PhoneNumber)
  @JoinColumn()
  number: PhoneNumber;

  @OneToMany(() => Contact, (contact) => contact.contactOfUser, {
    nullable: true,
  })
  contacts: Contact[];
}
