import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT numberId as id, name, p.phoneNumber, p.countryCode, p.isRegistered, p.spamCount FROM user u
        INNER JOIN phone_number p ON p.id = u.numberId
      UNION 
      SELECT numberId as id, name, p.phoneNumber, p.countryCode, p.isRegistered, p.spamCount FROM contact c 
        INNER JOIN phone_number p ON p.id = c.numberId
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
  isRegistered: boolean;

  @ViewColumn()
  spamCount: number;
}
