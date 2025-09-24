/**
 * Migration script to convert existing Pet IDs from CUID to 8-character alphanumeric codes
 *
 * This script should be run AFTER the schema migration to update existing data
 *
 * WARNING: This will change all existing pet IDs and their references.
 * Make sure to backup your database before running this script.
 */

import { db } from "../lib/db";
import { generateUniquePetCode } from "../lib/pet-codes";

async function migratePetIds() {
  console.log("Starting Pet ID migration...");

  try {
    // Get all existing pets
    const existingPets = await db.pet.findMany({
      include: {
        photos: true,
      },
    });

    console.log(`Found ${existingPets.length} pets to migrate`);

    // Create a map of old ID to new ID
    const idMapping: Record<string, string> = {};

    // Generate new IDs for all pets
    for (const pet of existingPets) {
      const newId = await generateUniquePetCode();
      idMapping[pet.id] = newId;
      console.log(`Pet "${pet.name}" (${pet.id}) -> ${newId}`);
    }

    // Use a transaction to update all data atomically
    await db.$transaction(async (tx) => {
      // For each pet, update its ID and related photos
      for (const pet of existingPets) {
        const newId = idMapping[pet.id];

        // First, update all photo references
        await tx.petPhoto.updateMany({
          where: { petId: pet.id },
          data: { petId: newId },
        });

        // Then update the pet itself by deleting and recreating
        await tx.pet.delete({
          where: { id: pet.id },
        });

        await tx.pet.create({
          data: {
            id: newId,
            name: pet.name,
            type: pet.type,
            sex: pet.sex,
            birthDate: pet.birthDate,
            breed: pet.breed,
            size: pet.size,
            hairType: pet.hairType,
            hairPattern: pet.hairPattern,
            color: pet.color,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt,
            userId: pet.userId,
          },
        });
      }
    });

    console.log("Migration completed successfully!");
    console.log("ID Mapping:");
    console.table(idMapping);

    return idMapping;
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  migratePetIds()
    .then((mapping) => {
      console.log("Migration completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

export { migratePetIds };
