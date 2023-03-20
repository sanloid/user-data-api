import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  role: Role;
  login: string;
  password: string;
}
