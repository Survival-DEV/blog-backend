import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../../models/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginCredentialsPayload } from '../auth/interface';
import { comparePasswords } from '../../helpers';
import { ERRORS, PostgresErrorCode } from '../../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: RegisterUserDto): Promise<UserEntity> {
    const IsUsernameExists = await this.findByEmailOrUsername(
      userData.username,
    );
    if (IsUsernameExists) {
      throw new HttpException(
        ERRORS.USERNAME_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmailOrUsername(input: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: [
        input.includes('@') ? `email = :input` : `username = :input`,
        { input },
      ],
      select: [
        'username',
        'first_name',
        'last_name',
        'bio',
        'created_at',
        'email',
        'github',
        'linked_in',
        'photo',
        'blogs',
      ],
      relations: ['blogs'],
    });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findByLogin({
    email,
    password,
  }: LoginCredentialsPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password', 'first_name'],
      where: { email },
    });

    if (!user)
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    if (!user.isEmailConfirmed)
      throw new HttpException(
        ERRORS.USER_EMAIL_NOT_VERIFIED,
        HttpStatus.UNAUTHORIZED,
      );

    comparePasswords(password, user.password);
    return user;
  }

  async updateUser(
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

  async CheckUserExistance(username) {
    const IsUserExists = await this.findByEmailOrUsername(username);
    if (!IsUserExists)
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
