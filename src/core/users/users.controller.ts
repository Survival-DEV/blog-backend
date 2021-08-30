import {
  Body,
  Param,
  Controller,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'User Updated' })
  @ApiBody({ type: [UpdateUserDto] })
  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body() data: UpdateUserDto,
  ) {
    const result = await this.users.updateUserByUsername(data, username);
    if (result.affected === 0) {
      throw new HttpException('Updates noting', HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.users.removeUser(id);
  }
}
