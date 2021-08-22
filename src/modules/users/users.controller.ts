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
  ApiResponse,
} from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

import { UserEntity } from '../../models/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'User Found' })
  async findAll(): Promise<UserEntity[]> {
    return await this.users.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'User Added' })
  @ApiResponse({ status: 201, type: UserEntity })
  async create(@Body() data: CreateUserDto): Promise<InsertResult> {
    return await this.users.create(data);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'User Updated' })
  @ApiBody({ type: [UpdateUserDto] })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const result = await this.users.update(data, id);
    if (result.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'UPDATE FAILED',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete()
  async delete(@Body() id: string) {
    return this.users.remove(id);
  }
}
