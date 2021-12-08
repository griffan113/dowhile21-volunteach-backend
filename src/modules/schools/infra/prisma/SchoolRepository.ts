import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, School } from '@prisma/client';

import { PrismaService } from '@shared/infra/prisma/Prisma.service';
import { CreateSchoolDTO } from '@modules/schools/dtos/CreateSchoolDTO';
import { ISchoolRepository } from '@modules/schools/repositories/ISchoolRepository';

@Injectable()
export default class SchoolRepository implements ISchoolRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<School | undefined> {
    const school = await this.ormRepository.school.findUnique({
      where: { id },
    });

    return school;
  }

  public async delete(id: string): Promise<School> {
    const School = await this.ormRepository.school.delete({ where: { id } });

    return School;
  }

  public async create(schoolData: CreateSchoolDTO): Promise<School> {
    const { name, user_id } = schoolData;

    const school = await this.ormRepository.school.create({
      data: { name, user: { connect: { id: user_id } } },
    });

    return school;
  }

  public async update(school: School): Promise<School> {
    const { id, user_id, name } = school;

    const School = await this.ormRepository.school.update({
      data: { name, user: { connect: { id: user_id } } },
      where: { id },
    });

    return School;
  }
}
