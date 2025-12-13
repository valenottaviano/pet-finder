import { db } from "./db";

/**
 * Generates a unique 8-character alphanumeric code for pets
 * Uses uppercase letters and numbers (excluding confusing characters like 0, O, I, 1)
 */
export async function generateUniquePetCode(): Promise<string> {
  // Characters to use (excluding confusing ones: 0, O, I, 1)
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789";
  const codeLength = 8;

  let attempts = 0;
  const maxAttempts = 50; // Increased from 10 to 50 for better reliability

  while (attempts < maxAttempts) {
    let code = "";

    // Generate random code
    for (let i = 0; i < codeLength; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    try {
      // Check if code already exists
      const existing = await db.pet.findUnique({
        where: { id: code },
        select: { id: true }, // Only select id for better performance
      });

      if (!existing) {
        console.log(
          `Generated unique pet code: ${code} (attempt ${attempts + 1})`
        );
        return code;
      }

      console.log(
        `Code ${code} already exists, trying again... (attempt ${attempts + 1})`
      );
    } catch (error) {
      console.error(
        `Error checking code uniqueness on attempt ${attempts + 1}:`,
        error
      );
      // Continue to next attempt even if database check fails
    }

    attempts++;
  }

  // If we can't generate a unique code after max attempts,
  // use a more sophisticated fallback with timestamp + random
  console.warn(
    `Failed to generate unique code after ${maxAttempts} attempts, using fallback method`
  );

  const timestamp = Date.now().toString(36).toUpperCase().slice(-3); // Use last 3 characters
  let baseCode = "";

  // Generate 5 random characters + 3 from timestamp = 8 total
  for (let i = 0; i < codeLength - 3; i++) {
    baseCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const fallbackCode = baseCode + timestamp;
  console.log(`Generated fallback pet code: ${fallbackCode}`);

  return fallbackCode;
}

/**
 * Validates if a pet code has the correct format
 */
export function isValidPetCode(code: string): boolean {
  // Check if it's exactly 8 characters and contains only allowed characters
  const validChars = /^[ABCDEFGHIJKLMNPQRSTUVWXYZ23456789]{8}$/;
  return validChars.test(code);
}

/**
 * Checks if a specific pet code is available (not already in use)
 */
export async function isPetCodeAvailable(code: string): Promise<boolean> {
  if (!isValidPetCode(code)) {
    return false;
  }

  try {
    const existing = await db.pet.findUnique({
      where: { id: code },
      select: { id: true },
    });

    return !existing;
  } catch (error) {
    console.error("Error checking pet code availability:", error);
    return false; // Assume not available if there's an error
  }
}

/**
 * Gets statistics about pet code usage
 */
export async function getPetCodeStats() {
  try {
    const totalPets = await db.pet.count();

    // Calculate total possible combinations
    const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789"; // 32 characters
    const totalPossible = Math.pow(chars.length, 8); // 32^8

    const usagePercentage = (totalPets / totalPossible) * 100;

    return {
      totalPets,
      totalPossible,
      usagePercentage: Number(usagePercentage.toFixed(8)),
      remainingCodes: totalPossible - totalPets,
    };
  } catch (error) {
    console.error("Error getting pet code statistics:", error);
    return null;
  }
}

/**
 * Generates a batch of unique generic QR codes
 * @param quantity - Number of codes to generate
 * @returns Array of generated codes or null if failed
 */
export async function generateBatchGenericQRCodes(
  quantity: number
): Promise<string[] | null> {
  if (quantity <= 0 || quantity > 10000) {
    console.error("Quantity must be between 1 and 10000");
    return null;
  }

  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789";
  const codeLength = 8;
  const generatedCodes: string[] = [];
  const maxAttemptsPerCode = 100;

  console.log(`Starting batch generation of ${quantity} generic QR codes...`);

  for (let i = 0; i < quantity; i++) {
    let attempts = 0;
    let codeGenerated = false;

    while (attempts < maxAttemptsPerCode && !codeGenerated) {
      let code = "";

      // Generate random code
      for (let j = 0; j < codeLength; j++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      try {
        // Check if code already exists in Pet table or GenericQRCode table
        const [existingPet, existingQRCode] = await Promise.all([
          db.pet.findUnique({
            where: { id: code },
            select: { id: true },
          }),
          db.genericQRCode.findUnique({
            where: { id: code },
            select: { id: true },
          }),
        ]);

        if (!existingPet && !existingQRCode) {
          // Code is unique, add to generated list
          generatedCodes.push(code);
          codeGenerated = true;

          if ((i + 1) % 100 === 0) {
            console.log(`Generated ${i + 1}/${quantity} codes...`);
          }
        }
      } catch (error) {
        console.error(
          `Error checking code uniqueness for code ${code}:`,
          error
        );
      }

      attempts++;
    }

    if (!codeGenerated) {
      console.error(
        `Failed to generate unique code after ${maxAttemptsPerCode} attempts at position ${
          i + 1
        }`
      );
      return null;
    }
  }

  // Insert all codes into database in a transaction
  try {
    console.log(`Inserting ${generatedCodes.length} codes into database...`);

    await db.$transaction(
      generatedCodes.map((code) =>
        db.genericQRCode.create({
          data: { id: code },
        })
      )
    );

    console.log(
      `✓ Successfully generated and saved ${generatedCodes.length} generic QR codes`
    );
    return generatedCodes;
  } catch (error) {
    console.error("Error inserting generic QR codes:", error);
    return null;
  }
}

/**
 * Checks if a code is a generic (unclaimed) QR code
 */
export async function isGenericQRCode(code: string): Promise<boolean> {
  if (!isValidPetCode(code)) {
    return false;
  }

  try {
    const genericCode = await db.genericQRCode.findUnique({
      where: { id: code },
      select: { claimed: true },
    });

    return genericCode !== null && !genericCode.claimed;
  } catch (error) {
    console.error("Error checking if code is generic QR code:", error);
    return false;
  }
}

/**
 * Gets statistics about generic QR codes
 */
export async function getGenericQRCodeStats() {
  try {
    const [total, claimed, unclaimed] = await Promise.all([
      db.genericQRCode.count(),
      db.genericQRCode.count({ where: { claimed: true } }),
      db.genericQRCode.count({ where: { claimed: false } }),
    ]);

    return {
      total,
      claimed,
      unclaimed,
      claimedPercentage:
        total > 0 ? Number(((claimed / total) * 100).toFixed(2)) : 0,
    };
  } catch (error) {
    console.error("Error getting generic QR code statistics:", error);
    return null;
  }
}
