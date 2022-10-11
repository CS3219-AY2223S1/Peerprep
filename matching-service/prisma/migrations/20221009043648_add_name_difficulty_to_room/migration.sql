/*
  Warnings:

  - Added the required column `difficulty` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userOneName` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTwoName` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "userOneName" TEXT NOT NULL,
ADD COLUMN     "userTwoName" TEXT NOT NULL;
