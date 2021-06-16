import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private users: UsersService,
    ){}

    @Get()
    async findAll():Promise<User[]>{
        return await this.users.findAll();
    }
    @Post()
    async create(@Body()data:any):Promise<User>{
        return await this.users.create(data);
    }

}
