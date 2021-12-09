import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { UsersModule } from '@modules/users/users.module';
import { PrismaService } from './infra/prisma/Prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/users/infra/http/guards/JwtAuth.guard';
import { SchoolsModule } from '@modules/schools/schools.module';
import { VolunteerWorksModule } from '@modules/volunteer_works/volunteer_works.module';
import { SubjectsModule } from '@modules/subjects/subjects.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
  imports: [
    SchoolsModule,
    SubjectsModule,
    VolunteerWorksModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class AppModule {}
