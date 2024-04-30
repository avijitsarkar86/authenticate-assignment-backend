import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser, ICurrentUser } from 'src/decorators/current-user.decorator';
import { CreateSpamDto } from './dto/create-spam.dto';
import { User } from 'src/users/entities/user.entity';


@UseGuards(AuthGuard)
@ApiTags('contacts')
@ApiBearerAuth()
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @ApiQuery({ name: 'searchStr', example: 'john' })
  @Get('/name-search')
  listContactsByName(@Query() query: { searchStr: string }) {
    const { searchStr } = query;
    return this.contactsService.findContactsByName(searchStr);
  }

  @ApiQuery({ name: 'number', example: 91123456 })
  @Get('/number-search')
  listContactsByNumber(@Query() query) {
    const { number } = query;
    return this.contactsService.findContactsByNumber(number);
  }

  @Get('/:numberId')
  getContactDetails(@Param() params: { numberId: string }, @CurrentUser() currentUser: ICurrentUser) {
    const { numberId } = params;
    return this.contactsService.getContactDetails(numberId, currentUser);
  }

  @Post('/mark-as-spam')
  @HttpCode(200)
  markNumberAsSpam(@Body() body: CreateSpamDto, @Request() request) {

    return this.contactsService.markContactAsSpam(body, request.user as User);
  }
}
