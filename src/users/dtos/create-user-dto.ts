import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @MinLength(1)
  @MaxLength(4)
  countryCode: number;

  @IsNumber()
  @MinLength(9)
  @MaxLength(12) // assumed that maximum number digit will be 12
  phoneNumber: number;

  @IsString()
  password: string;
}
