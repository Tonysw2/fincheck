import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountRepo: BankAccountsRepository) {}
  async validate(bankAccountId: string, userId: string) {
    const isOwner = await this.bankAccountRepo.findFirst({
      where: { id: bankAccountId, userId },
      select: { id: true },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
