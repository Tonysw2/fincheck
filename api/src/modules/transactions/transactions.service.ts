import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/validate-category-ownership.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction';
import { ValidateTransactionsOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionsOwnershipService,
  ) {}

  findAllByUserId(
    userId: string,
    filter: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filter.bankAccountId,
        type: filter.type,
        date: {
          gte: new Date(Date.UTC(filter.year, filter.month)),
          lt: new Date(Date.UTC(filter.year, filter.month + 1)),
        },
      },

      select: {
        id: true,
        bankAccountId: true,
        date: true,
        name: true,
        type: true,
        value: true,
        transactionCategory: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, transactionCategoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      transactionCategoryId,
    });

    return this.transactionsRepo.create({
      data: {
        bankAccountId,
        transactionCategoryId,
        userId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { date, name, type, value, bankAccountId, transactionCategoryId } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      transactionCategoryId,
      transactionId,
    });

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        date,
        name,
        type,
        value,
        bankAccountId,
        transactionCategoryId,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepo.delete({
      where: { id: transactionId },
    });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    transactionCategoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    transactionCategoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          bankAccountId,
          userId,
        ),
      transactionCategoryId &&
        this.validateCategoryOwnershipService.validate(
          userId,
          transactionCategoryId,
        ),
    ]);
  }
}
