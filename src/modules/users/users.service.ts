import { Injectable, HttpStatus } from '@nestjs/common';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../../models/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findByLogin({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
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
