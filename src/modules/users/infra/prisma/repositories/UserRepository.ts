import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { Inject, Injectable } from '@nestjs/common';
import {
  PrismaClient,
  School,
  Subject,
  User,
  VolunteerWork,
} from '@prisma/client';

import { PrismaService } from '@shared/infra/prisma/Prisma.service';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<
    | (User & {
        taught_subjects: Subject[];
        school: School;
        subscribed_volunteer_works: VolunteerWork[];
      })
    | undefined
  > {
    const user = await this.ormRepository.user.findUnique({
      where: { id },
      include: {
        taught_subjects: true,
        school: true,
        subscribed_volunteer_works: true,
      },
    });

    return user;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.user.findMany();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.user.findUnique({ where: { email } });

    return user;
  }

  public async delete(id: string): Promise<User> {
    const deleteUser = await this.ormRepository.user.delete({ where: { id } });

    return deleteUser;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = await this.ormRepository.user.create({
      data: userData,
    });

    return user;
  }

  public async update(user: User): Promise<User> {
    const { id, email, password, name, telephone, type } = user;

    const updateUser = await this.ormRepository.user.update({
      data: { email, password, name, telephone, type },
      where: { id },
    });

    return updateUser;
  }
}
