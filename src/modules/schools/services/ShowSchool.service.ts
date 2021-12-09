import { School, User } from '.prisma/client';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISchoolRepository } from '../repositories/ISchoolRepository';

interface IRequest {
  id: string;
}

@Injectable()
export default class ShowSchoolService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  public async execute(currentUser: User, { id }: IRequest): Promise<School> {
    const findSchool = await this.schoolRepository.findById(id);

    if (!findSchool) throw new NotFoundException('School not found');

    // For security reasons
    if (findSchool.user_id !== currentUser.id) {
      throw new NotFoundException('School not found');
    }

    return findSchool;
  }
}
