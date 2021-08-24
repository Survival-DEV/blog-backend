import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  id: string;

  @ApiProperty({ type: String, description: 'first name' })
  @IsOptional()
  first_name?: string;

  @ApiProperty({ type: String, description: 'last name' })
  @IsOptional()
  last_name?: string;

  @ApiProperty({ type: String, description: 'password' })
  @Exclude()
  password: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, description: 'bio' })
  @IsOptional()
  bio?: string;

  @ApiProperty({ type: String, description: 'bio' })
  updated_at: Date;

  @ApiProperty({ type: String, description: 'github link' })
  github?: string;

  @ApiProperty({ type: String, description: 'linkedin link' })
  linked_in?: string;

  @ApiProperty({ type: String, description: 'photo' })
  photo?: string;
}
