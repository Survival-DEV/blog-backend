import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.users.findAll();
  }
  @Post()
  async create(@Body() data: any): Promise<User> {
    return await this.users.create(data);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.users.update(data);
  }
  @Delete()
  async delete(@Body() id: string) {
    return this.users.remove(id);
  }
}
