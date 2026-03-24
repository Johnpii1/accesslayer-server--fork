# Wallet Identity Module

This module defines the mapping between application users and their Stellar public wallet addresses.

## StellarWallet Model

The `StellarWallet` model is a 1:1 relationship with the `User` model, serving as a clean identity boundary for Stellar-related features.

- **`address`**: The Stellar public key (G-address).
- **`userId`**: Foreign key to the `User` model.
- **`createdAt/updatedAt`**: Standard timestamps.

## Validation Assumptions

Stellar public addresses (G-addresses) must satisfy the following criteria:

1. **Length**: Exactly 56 characters long.
2. **Identifier**: Must start with the character 'G' (denoting a public key).
3. **Encoding**: Must use Stellar's Base32 encoding (A-Z and digits 2-7).

### Schema Validation (Zod)

```typescript
export const StellarAddressSchema = z
   .string()
   .length(56, 'Stellar address must be exactly 56 characters long')
   .regex(/^G[A-Z2-7]{55}$/, 'Invalid Stellar public key format');
```

## Service Boundary

The service boundary is defined in `wallet.utils.ts` and `wallet.types.ts`, providing methods for:

- **`upsertStellarWallet`**: Mapping/updating a user's Stellar address.
- **`getStellarWalletByUserId`**: Retrieving the wallet for a specific user.
- **`getUserByStellarAddress`**: Reverse lookup of a user by their wallet address.
- **`isStellarAddressRegistered`**: Checking if an address is already in use.
