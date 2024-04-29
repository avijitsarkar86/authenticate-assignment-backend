import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT numberId as id, name, p.countryCode, p.phoneNumber, CONCAT('+', p.countryCode, '-', p.phoneNumber) as contactNumber, p.isRegistered, p.spamCount FROM user u
    INNER JOIN phone_number p ON p.id = u.numberId
  UNION 
  SELECT p.id, c.name, p.countryCode, p.phoneNumber, CONCAT('+', p.countryCode, '-', p.phoneNumber) as contactNumber, p.isRegistered, p.spamCount FROM phone_number p
  LEFT JOIN contact c ON (p.id = c.numberId)
    WHERE p.isRegistered = false
  `,
})
export class ContactBook {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  countryCode: number;

  @ViewColumn()
  phoneNumber: number;

  @ViewColumn()
  contactNumber: string;

  @ViewColumn()
  isRegistered: boolean;

  @ViewColumn()
  spamCount: number;
}
