-- CreateTable
CREATE TABLE "public"."generic_qr_codes" (
    "id" TEXT NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "claimed_at" TIMESTAMP(3),
    "claimed_by_user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generic_qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "generic_qr_codes_claimed_idx" ON "public"."generic_qr_codes"("claimed");
