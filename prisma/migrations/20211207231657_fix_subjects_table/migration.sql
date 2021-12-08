/*
  Warnings:

  - You are about to drop the column `email` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `subjects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "subjects_email_key";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "email",
DROP COLUMN "password";
