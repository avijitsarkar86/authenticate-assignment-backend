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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  countryCode: number;

  @Column({ type: 'integer' })
  phoneNumber: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => Task, (task) => task.user)
  // tasks: Task[];
}
