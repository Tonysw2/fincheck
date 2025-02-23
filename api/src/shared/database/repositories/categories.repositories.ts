import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prismaService: PrismaService) {}

  findMany(categoriesDto: Prisma.TransactionCategoryFindManyArgs) {
    return this.prismaService.transactionCategory.findMany(categoriesDto);
  }
}
