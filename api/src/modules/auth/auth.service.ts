import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const userExists = await this.usersRepository.findUnique({
      where: { email: signUpDto.email },
      select: { id: true },
    });

    if (userExists) {
      throw new ConflictException('This user already exists.');
    }

    const hashedPassword = await hash(signUpDto.password, 12);

    const user = await this.usersRepository.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,

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

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findUnique({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isValidPassword = await compare(signInDto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
