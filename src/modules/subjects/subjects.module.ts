import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/infra/prisma/Prisma.service';
import SubjectsController from './infra/http/controllers/Subjects.controller';
import SubscribeAtSubjectController from './infra/http/controllers/SubscribeAtSubject.controller';
import UnsubscribeAtSubjectController from './infra/http/controllers/UnsubscribeAtSubject.controller';
import SubjectRepository from './infra/prisma/repositories/SubjectRepository';
import IndexSubjectsService from './services/IndexSubjects.service';
import SubscribeAtSubjectService from './services/SubscribeAtSubject.service';
import UnsubscribeAtSubjectService from './services/UnsubscribeAtSubject.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'SubjectRepository', useClass: SubjectRepository },
    { provide: 'IndexSubjectsService', useClass: IndexSubjectsService },
    {
      provide: 'UnsubscribeAtSubjectService',
      useClass: UnsubscribeAtSubjectService,
    },
    {
      provide: 'SubscribeAtSubjectService',
      useClass: SubscribeAtSubjectService,
    },
  ],
  controllers: [
    SubjectsController,
    UnsubscribeAtSubjectController,
    SubscribeAtSubjectController,
  ],
})
export class SubjectsModule {}
