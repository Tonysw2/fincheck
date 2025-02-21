import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findUnique({
      where: {
        email: createUserDto.email,
      },
      select: { id: true },
    });

    if (userExists) {
      throw new ConflictException('This user already exists.');
    }

    const hasedPassword = await hash(createUserDto.password, 12);

    const createdUser = await this.usersRepository.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hasedPassword,

        transactionCategories: {
          createMany: {
            data: [
              {
                name: 'Salário',
                icon: 'salary',
                type: 'INCOME',
              },
              {
                name: 'Freelance',
                icon: 'freelance',
                type: 'INCOME',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'INCOME',
              },
              {
                name: 'Casa',
                icon: 'home',
                type: 'EXPENSE',
              },
              {
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
              {
                name: 'Educação',
                icon: 'education',
                type: 'EXPENSE',
              },
              {
                name: 'Lazer',
                icon: 'fun',
                type: 'EXPENSE',
              },
              {
                name: 'Mercado',
                icon: 'grocery',
                type: 'EXPENSE',
              },
              {
                name: 'Roupas',
                icon: 'clothes',
                type: 'EXPENSE',
              },
              {
                name: 'Transporte',
                icon: 'transport',
                type: 'EXPENSE',
              },
              {
                name: 'Viagem',
                icon: 'travel',
                type: 'EXPENSE',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'EXPENSE',
              },
            ],
          },
        },
      },
    });

    return createdUser;
  }
}
