import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  create() {
    return this.prismaService.create();
  }
}
