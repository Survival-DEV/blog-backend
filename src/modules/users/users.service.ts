import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../../models/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginCredentialsPayload } from '../auth/interface/payload.interface';
import { comparePasswords } from '../../utils';
import { ERRORS, PostgresErrorCode } from '../../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ relations: ['blogs'] });
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  //TODO: correct this input type
  async findByLogin({
    email,
    password,
  }: LoginCredentialsPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password', 'first_name'],
      where: { email },
    });

    if (!user)
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);

    if (!user.isEmailConfirmed) {
      throw new HttpException(
        ERRORS.USER_EMAIL_NOT_VERIFIED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const areMatchedPasswords = comparePasswords(password, user.password);

    if (!areMatchedPasswords) {
      throw new HttpException(
        ERRORS.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async markEmailAsConfirmed(email: string) {
    const updated = await this.usersRepository.update(
      {
        email,
      },
      { isEmailConfirmed: true },
    );
    if (!!updated.affected) {
      return 'congratulations your Account has been confirmed';
    }
  }

  async update(data: UpdateUserDto, id: string): Promise<UpdateResult> {
    return await this.usersRepository.update({ id }, data);
  }

  async create(userData: RegisterUserDto): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const newUser = await this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException(ERRORS.USER_EMAIL_ALREADY_EXISTS);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
