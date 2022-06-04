/*
  Warnings:

  - You are about to drop the column `deadline` on the `todo` table. All the data in the column will be lost.
  - Added the required column `dayDeadline` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthDeadline` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearDeadline` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "deadline",
ADD COLUMN     "dayDeadline" INTEGER NOT NULL,
ADD COLUMN     "monthDeadline" INTEGER NOT NULL,
ADD COLUMN     "yearDeadline" INTEGER NOT NULL;
