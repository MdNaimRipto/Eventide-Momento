/*
  Warnings:

  - You are about to drop the column `host` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "host",
DROP COLUMN "user";
