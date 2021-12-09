import { UseGuards } from '@nestjs/common';

import { EnsureCommonUserGuard } from '../guards/EnsureCommonUser.guard';

export const SetCommonUserRoute = () => UseGuards(EnsureCommonUserGuard);
