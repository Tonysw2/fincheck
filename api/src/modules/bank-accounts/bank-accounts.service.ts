import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from './dtos/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.bankAccountRepo.findMany({
      where: { userId },
    });
  }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { type, name, color, initialBalance } = createBankAccountDto;

    return this.bankAccountRepo.create({
      data: {
        userId,
        type,
        name,
        color,
        initialBalance,
      },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      bankAccountId,
      userId,
    );

    const { type, name, color, initialBalance } = updateBankAccountDto;

    return this.bankAccountRepo.update({
      where: { id: bankAccountId, userId },
      data: { type, name, color, initialBalance },
    });
  }

  async delete(bankAccountId: string, userId: string) {
    await this.validateBankAccountOwnershipService.validate(
      bankAccountId,
      userId,
    );

    await this.bankAccountRepo.delete({
      where: { id: bankAccountId, userId },
    });

    return null;
  }
}
