-- CreateEnum
CREATE TYPE "public"."PetType" AS ENUM ('DOG', 'CAT', 'BIRD', 'RABBIT', 'HAMSTER', 'FISH', 'REPTILE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PetSex" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "public"."PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- CreateEnum
CREATE TYPE "public"."HairType" AS ENUM ('SHORT', 'MEDIUM', 'LONG', 'CURLY', 'HAIRLESS');

-- CreateTable
CREATE TABLE "public"."pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."PetType" NOT NULL,
    "sex" "public"."PetSex" NOT NULL,
    "birth_date" TIMESTAMP(3),
    "breed" TEXT,
    "size" "public"."PetSize",
    "hair_type" "public"."HairType",
    "hair_pattern" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pet_photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
