import { School, Subject, User, VolunteerWork } from '@prisma/client';

export type CompleteUser = User & {
  taught_subjects: Subject[];
  school: School;
  subscribed_volunteer_works: VolunteerWork[];
};
