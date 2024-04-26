import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('UQ_NUMBER', ['countryCode', 'phoneNumber'])
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'smallint' })
    countryCode: number;

    @Column({ type: 'integer' })
    phoneNumber: number;

    @Column({ type: 'bigint', default: 0 })
    spamCount: number;
}
