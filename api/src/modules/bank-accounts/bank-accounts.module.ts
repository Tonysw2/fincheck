import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService],
  exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountsModule {}
