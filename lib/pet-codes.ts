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
