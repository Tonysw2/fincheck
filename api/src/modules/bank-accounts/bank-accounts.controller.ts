import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from './dtos/update-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) bankAccountId: string,
  ) {
    await this.bankAccountsService.delete(bankAccountId, userId);
  }
}
