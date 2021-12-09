/*
  Warnings:

  - Added the required column `subject_id` to the `volunteer_works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "volunteer_works" ADD COLUMN     "subject_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "volunteer_works" ADD CONSTRAINT "volunteer_works_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
