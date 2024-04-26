import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './entities/phone-number.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PhoneNumber])],
})
export class PhoneNumbersModule { }
