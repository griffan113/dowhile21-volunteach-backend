import { School, User } from '.prisma/client';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ISchoolRepository } from '../repositories/ISchoolRepository';

interface IRequest {
  id: string;
}

@Injectable()
export default class DeleteSchoolService {
  constructor(
    @Inject('SchoolRepository')
    private noteRepository: ISchoolRepository
  ) {}

  public async execute(currentUser: User, { id }: IRequest): Promise<School> {
    const findSchool = await this.noteRepository.findById(id);

    if (findSchool.user_id !== currentUser.id) {
      throw new UnauthorizedException();
    }

    if (!findSchool) throw new NotFoundException('School not found');

    const deleteSchool = await this.noteRepository.delete(id);

    return deleteSchool;
  }
}
