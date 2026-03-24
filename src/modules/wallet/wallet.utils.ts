import { prisma } from '../../utils/prisma.utils';
import { MapUserToWalletType } from './wallet.schemas';

/**
 * Service boundary for Stellar wallet identity mapping.
 * Handles the association between application users and their Stellar public addresses.
 */

/**
 * Associates a Stellar address with a user.
 * If the user already has a wallet, it updates the address.
 * Ensures the address is unique across the system.
 */
export const upsertStellarWallet = async (input: MapUserToWalletType) => {
  return await prisma.stellarWallet.upsert({
    where: {
      userId: input.userId,
    },
    update: {
      address: input.address,
    },
    create: {
      userId: input.userId,
      address: input.address,
    },
  });
};

/**
 * Retrieves the Stellar wallet associated with a user ID.
 */
export const getStellarWalletByUserId = async (userId: string) => {
  return await prisma.stellarWallet.findUnique({
    where: {
      userId,
    },
  });
};

/**
 * Retrieves the user associated with a Stellar address.
 */
export const getUserByStellarAddress = async (address: string) => {
  return await prisma.stellarWallet.findUnique({
    where: {
      address,
    },
    include: {
      user: true,
    },
  });
};

/**
 * Checks if a Stellar address is already registered in the system.
 */
export const isStellarAddressRegistered = async (address: string) => {
  const wallet = await prisma.stellarWallet.findUnique({
    where: {
      address,
    },
  });
  return !!wallet;
};
