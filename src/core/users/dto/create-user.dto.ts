import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'user id' })
  id: string;

  @ApiProperty({ type: String, description: 'first name' })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String, description: 'last name' })
  @IsString()
  last_name: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, description: 'bio' })
  @IsOptional()
  bio: string;

  @ApiProperty({ type: Date, description: 'created at' })
  @IsOptional()
  created_at?: Date;

  @ApiProperty({ type: String, description: 'github link' })
  @IsOptional()
  github?: string;

  @ApiProperty({ type: String, description: 'linked in link' })
  @IsOptional()
  linked_in?: string;

  @ApiProperty({ type: String, description: 'photo' })
  @IsOptional()
  photo?: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
