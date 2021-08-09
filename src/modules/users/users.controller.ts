import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { UsersService } from './users.service';
import {ApiBody, ApiCreatedResponse,ApiOkResponse} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  @ApiOkResponse({description: 'User Found'})
  async findAll(): Promise<UserEntity[]> {
    return await this.users.findAll();
  }
  @Post()
  @ApiCreatedResponse({description:'User Added'})
  @ApiBody({ type: [CreateUserDto] })
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.users.create(data);
  }
  @Put(':id')
  @ApiCreatedResponse({description:'User Updated'})
  @ApiBody({ type: [UpdateUserDto] })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.users.update(data);
  }
  @Delete()
  async delete(@Body() id: string) {
    return this.users.remove(id);
  }
}
