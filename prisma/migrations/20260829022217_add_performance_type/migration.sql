/*
  Warnings:

  - You are about to drop the column `performedType` on the `Procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "performedType",
ADD COLUMN     "performanceType" TEXT NOT NULL DEFAULT 'observed';
