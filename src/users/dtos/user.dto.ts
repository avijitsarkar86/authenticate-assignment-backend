import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  countryCode: number;

  @Expose()
  phoneNumber: number;

  @Expose()
  email: string;

  @Expose()
  access_token: string;

  @Expose()
  message: string;
}
