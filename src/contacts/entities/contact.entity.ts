import { PhoneNumber } from '../../../src/phone-numbers/entities/phone-number.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => PhoneNumber, (num) => num.number, { nullable: true })
  number: PhoneNumber;

  @ManyToOne(() => User, (user) => user.contacts, { nullable: true })
  contactOfUser?: User | null;
}
