import {
  Body,
  Param,
  Controller,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Patch(':username')
  @ApiCreatedResponse({ description: 'User Updated' })
  @ApiBody({ type: [UpdateUserDto] })
  async update(
    @Param('username') username: string,
    @Body() data: UpdateUserDto,
  ) {
    const result = await this.users.updateUserByUsername(data, username);
    if (result.affected === 0) {
      throw new HttpException('Updates noting', HttpStatus.NO_CONTENT);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.users.removeUser(id);
  }
}
