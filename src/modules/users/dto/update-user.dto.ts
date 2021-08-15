import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  id: string;

  @ApiProperty({ type: String, description: 'first name' })
  first_name?: string;

  @ApiProperty({ type: String, description: 'last name' })
  last_name?: string;

  @ApiProperty({ type: String, description: 'password' })
  password?: string;

  @ApiProperty({ type: String, description: 'email' })
  email?: string;

  @ApiProperty({ type: String, description: 'bio' })
  bio?: string;
  created_at: Date;

  @ApiProperty({ type: String, description: 'github link' })
  github?: string;

  @ApiProperty({ type: String, description: 'linked in link' })
  linked_in?: string;

  @ApiProperty({ type: String, description: 'photo' })
  photo?: string;
}
