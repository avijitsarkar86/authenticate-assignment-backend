import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SearchContactDto } from './dto/search-contact.dto';

@ApiTags('contacts')
@UseGuards(AuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('/name-search')
  findContacts(@Query() query) {
    const { searchStr } = query;
    return this.contactsService.findContactsByName(searchStr);
  }

  @Get('/number-search')
  findContactsByNumber(@Query() query) {
    const { number } = query;
    return this.contactsService.findContactsByNumber(number);
  }
}
