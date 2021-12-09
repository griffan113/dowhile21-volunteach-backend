import { PrismaClient, Subject } from '@prisma/client';

import { CreateSubjectDTO } from '@modules/subjects/dtos/CreateSubjectDTO';
import { ISubjectRepository } from '@modules/subjects/repositories/ISubjectsRepository';
import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/infra/prisma/Prisma.service';

@Injectable()
export default class SubjectRepository implements ISubjectRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.subject.findUnique({
      where: { id },
    });

    return subject;
  }

  public async findMany(): Promise<Subject[]> {
    const subjects = await this.ormRepository.subject.findMany();

    return subjects;
  }

  public async subscribe(id: string, teacher_id: string): Promise<Subject> {
    const subject = await this.ormRepository.subject.update({
      data: {
        teachers: { connect: { id: teacher_id } },
      },
      where: { id },
    });

    return subject;
  }

  public async unsubscribe(id: string, teacher_id: string): Promise<Subject> {
    const subject = await this.ormRepository.subject.update({
      data: {
        teachers: { disconnect: { id: teacher_id } },
      },
      where: { id },
    });

    return subject;
  }

  public async delete(id: string): Promise<Subject> {
    const subject = await this.ormRepository.subject.delete({
      where: { id },
    });

    return subject;
  }

  public async create(subjectData: CreateSubjectDTO): Promise<Subject> {
    const { name } = subjectData;

    const createSubject = await this.ormRepository.subject.create({
      data: {
        name,
      },
    });

    return createSubject;
  }

  public async update(subject: Subject): Promise<Subject> {
    const { id, name } = subject;

    const updateSubject = await this.ormRepository.subject.update({
      data: {
        name,
      },
      where: { id },
    });

    return updateSubject;
  }
}
