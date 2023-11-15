-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "role" "USER_ROLES" NOT NULL DEFAULT 'USER';
