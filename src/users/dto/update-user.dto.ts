export class UpdateUserDto {
    id: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    email?: string;
    bio?: string;
    created_at: Date;
    github?: string;
    linked_in?: string;
    photo?: string;
  }