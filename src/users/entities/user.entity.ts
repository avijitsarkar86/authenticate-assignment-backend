import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';

@Entity()
@Unique('UQ_NUMBER', ['countryCode', 'phoneNumber'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 4 })
  countryCode: number;

  @Column({ length: 20 })
  phoneNumber: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => Task, (task) => task.user)
  // tasks: Task[];
}
