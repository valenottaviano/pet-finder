/**
 * Utility script to check pet code system health and statistics
 */

import { db } from "../lib/db";
import {
  getPetCodeStats,
  isValidPetCode,
  generateUniquePetCode,
} from "../lib/pet-codes";

async function checkPetCodeSystem() {
  console.log("🔍 Checking Pet Code System Health...\n");

  try {
    // 1. Get basic statistics
    console.log("📊 Getting statistics...");
    const stats = await getPetCodeStats();
    if (stats) {
      console.log("Statistics:");
      console.log(`  - Total pets: ${stats.totalPets.toLocaleString()}`);
      console.log(
        `  - Total possible codes: ${stats.totalPossible.toLocaleString()}`
      );
      console.log(`  - Usage percentage: ${stats.usagePercentage}%`);
      console.log(
        `  - Remaining codes: ${stats.remainingCodes.toLocaleString()}\n`
      );
    }

    // 2. Check for duplicate IDs (shouldn't happen, but let's verify)
    console.log("🔍 Checking for duplicate pet IDs...");
    const duplicateCheck = (await db.$queryRaw`
      SELECT id, COUNT(*) as count 
      FROM pets 
      GROUP BY id 
      HAVING COUNT(*) > 1
    `) as Array<{ id: string; count: bigint }>;

    if (duplicateCheck.length > 0) {
      console.log("❌ DUPLICATES FOUND:");
      duplicateCheck.forEach(({ id, count }) => {
        console.log(`  - ID ${id}: ${count} occurrences`);
      });
    } else {
      console.log("✅ No duplicate IDs found\n");
    }

    // 3. Check pet ID format validation
    console.log("🔍 Checking pet ID formats...");
    const allPets = await db.pet.findMany({
      select: { id: true, name: true },
      take: 100, // Check first 100 pets
    });

    const invalidFormats = allPets.filter((pet) => !isValidPetCode(pet.id));

    if (invalidFormats.length > 0) {
      console.log(
        `❌ Found ${invalidFormats.length} pets with invalid ID formats:`
      );
      invalidFormats.forEach((pet) => {
        console.log(`  - ${pet.name}: ${pet.id}`);
      });
    } else {
      console.log(
        `✅ All checked pet IDs have valid format (checked ${allPets.length} pets)\n`
      );
    }

    // 4. Test code generation
    console.log("🧪 Testing code generation...");
    const testCodes = [];
    for (let i = 0; i < 5; i++) {
      try {
        const code = await generateUniquePetCode();
        testCodes.push(code);
        console.log(`  - Generated: ${code}`);
      } catch (error) {
        console.log(`  - Failed to generate code: ${error}`);
      }
    }

    // Verify test codes are unique
    const uniqueTestCodes = new Set(testCodes);
    if (uniqueTestCodes.size === testCodes.length) {
      console.log("✅ All test codes are unique\n");
    } else {
      console.log("❌ Duplicate codes generated in test!\n");
    }

    // 5. Check recent pets
    console.log("📋 Recent pets with their codes:");
    const recentPets = await db.pet.findMany({
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    recentPets.forEach((pet) => {
      const isValid = isValidPetCode(pet.id);
      const status = isValid ? "✅" : "❌";
      console.log(
        `  ${status} ${pet.name}: ${
          pet.id
        } (${pet.createdAt.toLocaleDateString()})`
      );
    });

    console.log("\n🎉 Pet Code System Check Complete!");
  } catch (error) {
    console.error("❌ Error during system check:", error);
  }
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkPetCodeSystem()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("System check failed:", error);
      process.exit(1);
    });
}

export { checkPetCodeSystem };
