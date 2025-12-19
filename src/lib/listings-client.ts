// Client-side API wrapper functions
import { Listing } from '@/types/listing';

export async function createListing(listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Promise<Listing> {
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    throw new Error('Failed to create listing');
  }

  return response.json();
}

export async function updateListing(id: string, listing: Partial<Listing>): Promise<Listing> {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    throw new Error('Failed to update listing');
  }

  return response.json();
}

export async function deleteListing(id: string): Promise<void> {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete listing');
  }
}

export async function fetchListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings', {
    next: { revalidate: 60 }, // Use Next.js caching with 60s revalidation
  });

  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }

  return response.json();
}
