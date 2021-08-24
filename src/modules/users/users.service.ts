import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../../models/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredentialsPayload } from '../auth/interface/payload.interface';
import { comparePasswords } from '../../utils';
import { ERRORS } from '../../constants';
import { CreateUserDto } from './dto/create-user.dto';

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
    console.log('----------FindBy email', email);

    return await this.usersRepository.findOneOrFail({ email });
  }

  async markEmailAsConfirmed(email: string) {
    console.log('----------Marked as confiremd', email);

    return this.usersRepository.update(
      {
        email,
      },
      { isEmailConfirmed: true },
    );
  }

  async update(data: UpdateUserDto, id: string): Promise<UpdateResult> {
    return await this.usersRepository.update({ id }, data);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    try {
      if (!!data.password) {
        data.password = await bcrypt.hash(data.password, 12);
      }

      return await this.usersRepository.create(data);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(ERRORS.USER_EMAIL_ALREADY_EXISTS);
      }
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
