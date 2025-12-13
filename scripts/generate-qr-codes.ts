#!/usr/bin/env tsx
/**
 * CLI Script to generate batch generic QR codes
 * Usage: pnpm tsx scripts/generate-qr-codes.ts <quantity>
 * Example: pnpm tsx scripts/generate-qr-codes.ts 100
 */

import {
  generateBatchGenericQRCodes,
  getGenericQRCodeStats,
} from "../lib/pet-codes";
import { db } from "../lib/db";
import fs from "fs";
import path from "path";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("\n📋 Usage:");
    console.log("  pnpm tsx scripts/generate-qr-codes.ts <quantity>");
    console.log("\n📊 Examples:");
    console.log(
      "  pnpm tsx scripts/generate-qr-codes.ts 100    # Generate 100 codes"
    );
    console.log(
      "  pnpm tsx scripts/generate-qr-codes.ts 1000   # Generate 1000 codes"
    );
    console.log(
      "  pnpm tsx scripts/generate-qr-codes.ts stats  # Show statistics\n"
    );
    process.exit(1);
  }

  const command = args[0];

  // Handle stats command
  if (command === "stats") {
    console.log("\n📊 Generic QR Code Statistics\n");
    const stats = await getGenericQRCodeStats();

    if (stats) {
      console.log(`Total generated:     ${stats.total.toLocaleString()}`);
      console.log(`Claimed:             ${stats.claimed.toLocaleString()}`);
      console.log(`Unclaimed:           ${stats.unclaimed.toLocaleString()}`);
      console.log(`Claimed percentage:  ${stats.claimedPercentage}%\n`);
    } else {
      console.error("❌ Failed to retrieve statistics\n");
    }

    await db.$disconnect();
    process.exit(0);
  }

  // Handle generation command
  const quantity = parseInt(command, 10);

  if (isNaN(quantity) || quantity <= 0) {
    console.error("❌ Error: Quantity must be a positive number\n");
    process.exit(1);
  }

  if (quantity > 10000) {
    console.error("❌ Error: Maximum quantity is 10,000 codes per batch\n");
    process.exit(1);
  }

  console.log(
    `\n🔄 Generating ${quantity.toLocaleString()} generic QR codes...\n`
  );

  const codes = await generateBatchGenericQRCodes(quantity);

  if (codes) {
    // Save codes to a file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `qr-codes-${timestamp}.txt`;
    const filepath = path.join(process.cwd(), "generated", filename);

    // Create generated directory if it doesn't exist
    const dir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write codes to file (one per line)
    fs.writeFileSync(filepath, codes.join("\n"));

    console.log(`\n✅ Success!`);
    console.log(`📁 Codes saved to: ${filepath}`);
    console.log(`📊 Total codes generated: ${codes.length.toLocaleString()}\n`);

    // Show sample codes
    console.log("🔍 Sample codes (first 5):");
    codes.slice(0, 5).forEach((code, i) => {
      console.log(`  ${i + 1}. ${code}`);
    });
    console.log("");

    // Show statistics
    const stats = await getGenericQRCodeStats();
    if (stats) {
      console.log("📊 Updated Statistics:");
      console.log(`  Total generated:     ${stats.total.toLocaleString()}`);
      console.log(`  Unclaimed:           ${stats.unclaimed.toLocaleString()}`);
      console.log("");
    }
  } else {
    console.error("\n❌ Failed to generate QR codes\n");
    process.exit(1);
  }

  await db.$disconnect();
}

main().catch((error) => {
  console.error("\n❌ Error:", error);
  db.$disconnect();
  process.exit(1);
});
