"use cache";

// Server-side cached database functions using React 19's "use cache" directive
import { db } from '@/lib/db';
import { listings } from '@/db/schema';
import { Listing } from '@/types/listing';
import { eq, or } from 'drizzle-orm';

export async function getListingsCached(): Promise<Listing[]> {
  "use cache";
  "cache tag:all-listings";
  "cache max-age:60"; // Cache for 60 seconds

  const result = await db.select().from(listings);
  return result.map(l => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
}

export async function getPublicListingsCached(): Promise<Listing[]> {
  "use cache";
  "cache tag:public-listings";
  "cache max-age:60"; // Cache for 60 seconds

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

export async function getListingByIdCached(id: string): Promise<Listing | undefined> {
  "use cache";
  `cache tag:listing-${id}`;
  "cache max-age:60"; // Cache for 60 seconds

  const result = await db.select().from(listings).where(eq(listings.id, id));
  if (result.length === 0) return undefined;

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
}
