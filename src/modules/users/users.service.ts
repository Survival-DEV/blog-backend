import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../models/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ relations: ['blogs'], });
  }
  
  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }
  async update(data: any): Promise<UserEntity> {
    return await this.usersRepository.save(data);
  }
  create(data: any): Promise<UserEntity> {
    return this.usersRepository.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
