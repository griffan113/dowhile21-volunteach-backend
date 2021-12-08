import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import SchoolRepository from './infra/prisma/SchoolRepository';
import CreateSchoolService from './services/CreateSchool.service';
import DeleteSchoolService from './services/DeleteSchool.service';
import SchoolsController from './infra/http/controllers/Schools.controller';

@Module({
  providers: [
    PrismaService,
    { provide: 'SchoolRepository', useClass: SchoolRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'CreateSchoolService', useClass: CreateSchoolService },
    { provide: 'DeleteSchoolService', useClass: DeleteSchoolService },
  ],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
