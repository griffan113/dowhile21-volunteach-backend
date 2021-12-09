import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { VolunteerWork } from '.prisma/client';

import UnsubscribeAtSchoolVolunteerWorkService from '@modules/volunteer_works/services/UnsubscribeAtVolunteerWork.service';
import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import { SubscribeAtVolunteerWorkDTO } from '@modules/volunteer_works/dtos/SubscribeAtVolunteerWorkDTO';
import { CompleteUser } from '@modules/users/types/CompleteUser';

@SetTeacherRoute()
@Controller('voluteer_works/unsubscribe')
export default class UnsubscribeAtVolunteerWorkController {
  constructor(
    @Inject('UnsubscribeAtSchoolVolunteerWorkService')
    private unsubscribeAtSchoolVolunteerWorkService: UnsubscribeAtSchoolVolunteerWorkService
  ) {}

  @Put(':id')
  public async index(
    @GetUser() currentUser: CompleteUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    subscribeAtVolunteerWorkDTO: SubscribeAtVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const unsubscribeAtSchoolVolunteerWork =
      await this.unsubscribeAtSchoolVolunteerWorkService.execute(currentUser, {
        id,
        ...subscribeAtVolunteerWorkDTO,
      });

    return unsubscribeAtSchoolVolunteerWork;
  }
}
