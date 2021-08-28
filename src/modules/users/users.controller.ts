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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { UserEntity } from '../../models/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/roles.enum';

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
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.users.create(data);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  @Permissions(Role.User)
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
  

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete()
  @Permissions(Role.User, Role.Admin)
  async delete(@Body() id: string) {
    return this.users.remove(id);
  }
}
