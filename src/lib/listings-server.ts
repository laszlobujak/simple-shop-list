// Server-side database functions - DO NOT import in client components
import { db } from '@/lib/db';
import { listings } from '@/db/schema';
import { Listing } from '@/types/listing';
import { eq, or } from 'drizzle-orm';

export async function getListings(): Promise<Listing[]> {
  const result = await db.select().from(listings);
  return result.map(l => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
}

export async function getPublicListings(): Promise<Listing[]> {
  const result = await db.select().from(listings).where(
    or(
      eq(listings.status, 'active'),
      eq(listings.status, 'reserved')
    )
  );
  return result.map(l => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const result = await db.select().from(listings).where(eq(listings.id, id));
  if (result.length === 0) return undefined;

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
}
