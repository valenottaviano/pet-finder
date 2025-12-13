# Generic QR Codes Feature

This feature allows you to pre-generate generic QR codes that can be sold as pet tags before being associated with any specific pet. Users can later claim these codes and assign them to their pets.

## Overview

The system consists of:

1. A database table `GenericQRCode` to track pre-generated codes
2. CLI script to generate codes in batches
3. Public page flow to claim unclaimed codes
4. Modified pet creation flow to support claimed codes

## Generating QR Codes

### Using the CLI Script

Generate a batch of generic QR codes using the command line:

```bash
# Generate 100 codes
pnpm tsx scripts/generate-qr-codes.ts 100

# Generate 1000 codes
pnpm tsx scripts/generate-qr-codes.ts 1000

# View statistics
pnpm tsx scripts/generate-qr-codes.ts stats
```

### Output

- Generated codes are saved to `generated/qr-codes-[timestamp].txt`
- Each code is on a separate line for easy processing
- The script shows sample codes and statistics after generation

### Code Format

- 8 characters long
- Uppercase letters and numbers only
- Excludes confusing characters (0, O, I, 1) for better readability
- Example: `BDIUAD7F`, `Q6IUMWWJ`, `NWER4J5H`

## User Flow for Claiming Codes

### 1. Scanning an Unclaimed QR Code

When someone scans a generic (unclaimed) QR code:

1. They visit the URL: `https://yourapp.com/p/[CODE]?s=1`
2. The system detects it's an unclaimed generic code
3. A special claim page is shown instead of a pet profile

### 2. Claim Page

The claim page explains:

- This is a generic QR code not yet assigned to a pet
- User needs to log in or register to claim it
- After claiming, they can assign it to their pet

### 3. Authentication & Claiming

- User clicks "Iniciar Sesión y Reclamar Código"
- After login, they're redirected to `/home/new?code=[CODE]`
- The code is automatically claimed for that user
- A success message is shown

### 4. Pet Creation with Claimed Code

- User fills out the pet information form
- The claimed code is used as the pet's ID
- Once created, the QR code is fully functional and linked to the pet

## Technical Details

### Database Schema

```prisma
model GenericQRCode {
  id              String    @id // 8-character pet code
  claimed         Boolean   @default(false)
  claimedAt       DateTime? @map("claimed_at")
  claimedByUserId String?   @map("claimed_by_user_id")
  createdAt       DateTime  @default(now()) @map("created_at")

  @@index([claimed])
  @@map("generic_qr_codes")
}
```

### Key Functions

#### `generateBatchGenericQRCodes(quantity: number)`

Located in `lib/pet-codes.ts`

- Generates specified number of unique codes
- Checks for collisions with existing pets and generic codes
- Inserts all codes in a database transaction
- Returns array of generated codes

#### `isGenericQRCode(code: string)`

Located in `lib/pet-codes.ts`

- Checks if a code is an unclaimed generic QR code
- Used by public pet page to determine which UI to show

#### `claimGenericCode(code: string)`

Located in `app/(home)/_actions/claim-generic-code.ts`

- Server action to claim a generic code for the current user
- Validates user is authenticated
- Checks code exists and is unclaimed
- Marks code as claimed with timestamp and user ID

#### `createPet(values, existingCode?)`

Located in `app/(home)/_actions/create-pet.ts`

- Modified to accept optional existing code
- If code provided, uses it instead of generating new one
- Validates claimed code belongs to current user

### Components

#### `GenericQRCodeClaim`

Located in `app/(public)/p/[petId]/generic-qr-claim.tsx`

- Client component shown when unclaimed code is scanned
- Provides clear explanation and call-to-action buttons
- Handles callback URLs for post-login redirection

### Routes

- `/p/[CODE]` - Public route that detects unclaimed codes
- `/home/new?code=[CODE]` - Pet creation with pre-claimed code
- `/auth/login?callbackUrl=/home/new?code=[CODE]` - Login with redirect

## Statistics

### View Statistics

```bash
pnpm tsx scripts/generate-qr-codes.ts stats
```

Returns:

- Total generated codes
- Number claimed
- Number unclaimed
- Claim percentage

### Code Stats

The `getPetCodeStats()` function provides:

- Total possible combinations (32^8 = ~1.1 trillion)
- Current usage percentage
- Remaining available codes

## Best Practices

### Batch Generation

1. Generate codes in batches of 100-1000 at a time
2. Store the generated files safely
3. Print QR codes from the generated list
4. Keep track of which batches have been produced/sold

### Code Distribution

1. Generate codes before production
2. Create QR code images/tags from the generated codes
3. Codes remain valid indefinitely (no expiration)
4. Users can claim codes months or years after generation

### Monitoring

1. Regularly check statistics to see claim rates
2. Generate new batches as needed
3. Track which codes are claimed vs unclaimed
4. Monitor for any issues in the claim flow

## Security Considerations

- Codes are 8 characters with ~1.1 trillion combinations
- Collision detection prevents duplicate codes
- Claimed codes are locked to the claiming user
- Users can only create pets with codes they've claimed
- Race conditions are handled in code generation

## Future Enhancements

Possible improvements:

- Bulk code generation UI (admin panel)
- QR code image generation directly in the app
- Export codes to CSV/PDF for printing
- Track which codes have been printed/distributed
- Analytics on claim rates and timeframes
- Support for code batches with metadata (production date, vendor, etc.)
