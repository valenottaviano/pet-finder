-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('LOST', 'FOUND');

-- CreateTable
CREATE TABLE "pet_alert_posts" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "status" "AlertStatus" NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pet_alert_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_alert_posts" ADD CONSTRAINT "pet_alert_posts_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
