import { School, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import { CreateSchoolDTO } from '@modules/schools/dtos/CreateSchoolDTO';
import CreateSchoolService from '@modules/schools/services/CreateSchool.service';
import DeleteSchoolService from '@modules/schools/services/DeleteSchool.service';

@Controller('schools')
export default class SchoolsController {
  constructor(
    @Inject('CreateSchoolService')
    private createSchoolService: CreateSchoolService,

    @Inject('DeleteSchoolService')
    private deleteSchoolService: DeleteSchoolService
  ) {}

  @SetTeacherRoute()
  @Post()
  public async create(
    @GetUser() currentUser: User,
    @Body(ValidationPipe) createSchoolDTO: CreateSchoolDTO
  ): Promise<School> {
    const createSchool = await this.createSchoolService.execute(
      currentUser,
      createSchoolDTO
    );

    return createSchool;
  }

  @Delete(':id')
  public async delete(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<School> {
    const deleteSchool = await this.deleteSchoolService.execute(currentUser, {
      id,
    });

    return deleteSchool;
  }
}
