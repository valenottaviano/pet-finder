import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendPetScanNotification } from "@/lib/pet-scan-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { petId, latitude, longitude } = body;

    if (!petId) {
      return NextResponse.json(
        { error: "Pet ID is required" },
        { status: 400 }
      );
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { error: "Valid latitude and longitude are required" },
        { status: 400 }
      );
    }

    // Get pet information with owner details
    const pet = await db.pet.findUnique({
      where: { id: petId },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    if (!pet.user?.email) {
      return NextResponse.json(
        { error: "Owner email not found" },
        { status: 400 }
      );
    }

    // Get user agent and IP address for logging
    const userAgent = request.headers.get("user-agent") || undefined;
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded
      ? forwarded.split(",")[0].trim()
      : request.headers.get("x-real-ip") || undefined;

    // Create scan event in database
    const scanEvent = await db.scanEvent.create({
      data: {
        petId,
        latitude,
        longitude,
        userAgent,
        ipAddress,
      },
    });

    // Send notification email to owner
    const scanLocation =
      latitude !== 0 && longitude !== 0 ? { latitude, longitude } : undefined;

    const emailResult = await sendPetScanNotification(
      pet.user.email,
      pet.user.name || "Propietario",
      pet.name,
      scanLocation,
      scanEvent.createdAt
    );

    if (!emailResult.success) {
      console.error("Failed to send email notification:", emailResult.error);
      // We still return success for the scan event, even if email fails
    }

    return NextResponse.json({
      success: true,
      scanEvent: {
        id: scanEvent.id,
        createdAt: scanEvent.createdAt,
        hasLocation: latitude !== 0 && longitude !== 0,
      },
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Error processing scan event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
