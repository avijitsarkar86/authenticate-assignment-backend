import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 91, minimum: 1, maximum: 999 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(999)
  countryCode: number;

  @ApiProperty({ example: 1234567890 })
  @IsNotEmpty()
  @IsNumber()
  @Min(100000000)
  @Max(9999999999999) // assumed that maximum number digit will be 13
  phoneNumber: number;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
