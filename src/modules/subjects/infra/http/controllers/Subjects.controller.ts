import { Controller, Get, Inject } from '@nestjs/common';
import { Subject } from '@prisma/client';

import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import IndexSubjectsService from '@modules/subjects/services/IndexSubjects.service';

@SetTeacherRoute()
@Controller('subjects')
export default class SubjectsController {
  constructor(
    @Inject('IndexSubjectsService')
    private indexSubjectsService: IndexSubjectsService
  ) {}

  @Get()
  public async index(): Promise<Subject[]> {
    const indexSubjects = await this.indexSubjectsService.execute();

    return indexSubjects;
  }
}
