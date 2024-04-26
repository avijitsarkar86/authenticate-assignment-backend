import { PhoneNumber } from 'src/phone-numbers/entities/phone-number.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'smallint' })
  // countryCode: number;

  // @Column({ type: 'integer' })
  // phoneNumber: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => PhoneNumber, { cascade: true })
  @JoinColumn()
  number: PhoneNumber;
}
