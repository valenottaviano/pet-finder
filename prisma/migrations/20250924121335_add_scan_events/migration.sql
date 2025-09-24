-- CreateTable
CREATE TABLE "public"."scan_events" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scan_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scan_events_pet_id_idx" ON "public"."scan_events"("pet_id");

-- CreateIndex
CREATE INDEX "scan_events_created_at_idx" ON "public"."scan_events"("created_at");

-- AddForeignKey
ALTER TABLE "public"."scan_events" ADD CONSTRAINT "scan_events_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
