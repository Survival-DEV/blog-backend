import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../../models/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredentialsPayload } from '../auth/interface/payload.interface';
import { comparePasswords } from '../../utils';

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

  //TODO: correct the input type name
  async findByLogin({
    email,
    password,
  }: LoginCredentialsPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password', 'first_name'],
      where: { email },
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const areMatchedPasswords = comparePasswords(password, user.password);

    if (!areMatchedPasswords) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }


  async update(data: UpdateUserDto, id: string): Promise<UpdateResult> {
    return await this.usersRepository.update({ id }, data);
  }


  async create(data: any): Promise<InsertResult> {
    try {
      if (!!data.password) {
        data.password = await bcrypt.hash(data.password, 12);
      }
      return await this.usersRepository.insert(data);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exist');
      }
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
