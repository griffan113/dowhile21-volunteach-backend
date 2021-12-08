import { UseGuards } from '@nestjs/common';

import { EnsureTeacherGuard } from '../guards/EnsureTeacher.guard';

export const SetTeacherRoute = () => UseGuards(EnsureTeacherGuard);
