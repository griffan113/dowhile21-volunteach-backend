import { User } from '.prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUserRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findAllUsers: () => Promise<User[]>;
  delete: (id: string) => Promise<User>;
  create: (data: CreateUserDTO) => Promise<User>;
  update: (user: User) => Promise<User>;
}
