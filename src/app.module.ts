import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { ContactsModule } from './contacts/contacts.module';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { PhoneNumber } from './phone-numbers/entities/phone-number.entity';
import { Contact } from './contacts/entities/contact.entity';
import { ContactBook } from './contacts/entities/contact-book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME') as string,
        entities: [PhoneNumber, User, Contact, ContactBook],
        synchronize: true, // IMPORTANT: MAKE IT 'false' IN PRODUCTION
        logging: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ContactsModule,
    PhoneNumbersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class AppModule {}
