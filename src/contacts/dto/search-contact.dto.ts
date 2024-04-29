import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchContactDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  number: string;
}
