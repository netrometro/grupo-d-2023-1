/*
  Warnings:

  - The primary key for the `Alergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Alergy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Symptom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Symptom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Alergy" DROP CONSTRAINT "Alergy_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Alergy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Info" DROP CONSTRAINT "Info_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Info_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Symptom" DROP CONSTRAINT "Symptom_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id");
