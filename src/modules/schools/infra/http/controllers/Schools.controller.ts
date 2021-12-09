import { School, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { CreateSchoolDTO } from '@modules/schools/dtos/CreateSchoolDTO';
import CreateSchoolService from '@modules/schools/services/CreateSchool.service';
import DeleteSchoolService from '@modules/schools/services/DeleteSchool.service';
import ShowSchoolService from '@modules/schools/services/ShowSchool.service';
import UpdateSchoolService from '@modules/schools/services/UpdateSchool.service';
import { SetCommonUserRoute } from '@modules/users/infra/http/decorators/SetCommonUserRoute.decorator';
import { UpdateSchoolDTO } from '@modules/schools/dtos/UpdateSchoolDTO';

@SetCommonUserRoute()
@Controller('schools')
export default class SchoolsController {
  constructor(
    @Inject('CreateSchoolService')
    private createSchoolService: CreateSchoolService,

    @Inject('DeleteSchoolService')
    private deleteSchoolService: DeleteSchoolService,

    @Inject('ShowSchoolService')
    private showSchoolService: ShowSchoolService,

    @Inject('UpdateSchoolService')
    private updateSchoolService: UpdateSchoolService
  ) {}

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

  @Put(':id')
  public async update(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateSchoolDTO: UpdateSchoolDTO
  ): Promise<School> {
    const updateSchool = await this.updateSchoolService.execute(currentUser, {
      id,
      ...updateSchoolDTO,
    });

    return updateSchool;
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

  @Get(':id')
  public async show(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<School> {
    const showSchool = await this.showSchoolService.execute(currentUser, {
      id,
    });

    return showSchool;
  }
}
