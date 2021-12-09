import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { VolunteerWork, User } from '.prisma/client';

import { CreateVolunteerWorkDTO } from '@modules/volunteer_works/dtos/CreateVolunteerWorkDTO';
import CreateSchoolVolunteerWorkService from '@modules/volunteer_works/services/CreateSchoolVolunteerWork.service';
import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetCommonUserRoute } from '@modules/users/infra/http/decorators/SetCommonUserRoute.decorator';
import { UpdateVolunteerWorkDTO } from '@modules/volunteer_works/dtos/UpdateVolunteerWorkDTO';
import UpdateVolunteerWorkService from '@modules/volunteer_works/services/UpdateVolunteerWork.service';

@SetCommonUserRoute()
@Controller('voluteer_works')
export default class VolunteerWorksController {
  constructor(
    @Inject('CreateSchoolVolunteerWorkService')
    private createSchoolVolunteerWorkService: CreateSchoolVolunteerWorkService,

    @Inject('UpdateVolunteerWorkService')
    private updateVolunteerWorkService: UpdateVolunteerWorkService
  ) {}

  @Put(':id')
  public async update(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateVolunteerWorkDTO: UpdateVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const updateSchool = await this.updateVolunteerWorkService.execute(
      currentUser,
      {
        id,
        ...updateVolunteerWorkDTO,
      }
    );

    return updateSchool;
  }

  @Post()
  public async create(
    @GetUser() currentUser: User,
    @Body(ValidationPipe) createVolunteerWorkDTO: CreateVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const createVolunteerWork =
      await this.createSchoolVolunteerWorkService.execute(
        currentUser,
        createVolunteerWorkDTO
      );

    return createVolunteerWork;
  }
}
