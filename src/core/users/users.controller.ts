import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UserEntity } from '../../models/entities/user.entity';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Added' })
  @ApiOkResponse({ status: 201, type: UserEntity })
  async create(@Body() data: RegisterUserDto): Promise<UserEntity> {
    return await this.users.createUser(data);
  }

  @Patch(':username')
  @ApiCreatedResponse({ description: 'User Updated' })
  @ApiBody({ type: [UpdateUserDto] })
  async update(
    @Param('username') username: string,
    @Body() data: UpdateUserDto,
  ) {
    const result = await this.users.updateUser(data, username);
    if (result.affected === 0) {
      throw new HttpException('Updates noting', HttpStatus.NO_CONTENT);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.users.removeUser(id);
  }
}
