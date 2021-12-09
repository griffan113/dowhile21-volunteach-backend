import { Inject, Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { ISubjectRepository } from '../repositories/ISubjectsRepository';

@Injectable()
export default class IndexSubjectsService {
  constructor(
    @Inject('SubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}

  public async execute(): Promise<Subject[]> {
    const indexSubjects = await this.subjectRepository.findMany();

    return indexSubjects;
  }
}
