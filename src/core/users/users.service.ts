import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import { UserEntity } from '@entities/user.entity';
import { LoginPayload } from '@auth/interface';
import { comparePasswords } from '@helpers/';
import { ERRORS, PostgresErrorCode } from '@constants/';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: RegisterUserDto): Promise<UserEntity> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      return await this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException(ERRORS.USER_EMAIL_ALREADY_EXISTS);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveUser(data) {
    return this.usersRepository.save(data);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'username', 'first_name', 'last_name', 'isEmailConfirmed'],
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findByLogin({ email, password }: LoginPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'email',
        'password',
        'first_name',
        'last_name',
        'username',
        'isEmailConfirmed',
      ],
      where: { email },
    });

    if (!user)
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    if (!user.isEmailConfirmed)
      throw new HttpException(
        ERRORS.USER_EMAIL_NOT_VERIFIED,
        HttpStatus.UNAUTHORIZED,
      );

    await comparePasswords(password, user.password);
    return user;
  }

  async updateUserByUsername(
    data: UpdateUserDto,
    username: string,
  ): Promise<UpdateResult> {
    this.CheckUserExistance(username);
    return await this.usersRepository.update({ username }, data);
  }

  async removeUser(username: string): Promise<DeleteResult> {
    this.CheckUserExistance(username);
    return await this.usersRepository.delete(username);
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

  //TODO: Like WTH why this isn't updated username vs email
  async CheckUserExistance(username) {
    const IsUserExists = await this.findByEmail(username);
    if (!IsUserExists)
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
