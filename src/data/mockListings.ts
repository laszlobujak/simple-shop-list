import { Listing } from '@/types/listing';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Vintage Cartier Tank Watch',
    category: 'watches',
    price: 8500,
    description: 'Exquisite vintage Cartier Tank watch from the 1970s. 18k yellow gold case with original leather strap. Recently serviced with documentation. A timeless piece of horological history.',
    photos: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    ],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Art Deco Diamond Ring',
    category: 'jewelry',
    price: 12000,
    description: 'Stunning Art Deco diamond engagement ring circa 1925. Features a 1.5 carat center diamond with intricate platinum filigree work. Excellent condition with original setting.',
    photos: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    status: 'active',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    title: 'Mid-Century Eames Lounge Chair',
    category: 'furniture',
    price: 4500,
    description: 'Authentic Herman Miller Eames Lounge Chair and Ottoman from 1962. Rosewood veneer with original black leather cushions. Minor patina consistent with age.',
    photos: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
    ],
    status: 'active',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    title: 'Tiffany & Co. Pearl Necklace',
    category: 'jewelry',
    price: 3200,
    description: 'Elegant Tiffany & Co. South Sea pearl necklace with 18k gold clasp. Features 42 perfectly matched pearls. Comes with original Tiffany box and documentation.',
    photos: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    status: 'active',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    title: 'Impressionist Oil Painting',
    category: 'art',
    price: 25000,
    description: 'Original impressionist landscape painting by renowned French artist. Oil on canvas, circa 1890. Professionally restored and framed. Certificate of authenticity included.',
    photos: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    ],
    status: 'reserved',
    createdAt: '2024-01-11T11:00:00Z',
    updatedAt: '2024-01-16T08:00:00Z',
  },
  {
    id: '6',
    title: 'Rolex Submariner Date',
    category: 'watches',
    price: 14500,
    description: 'Rolex Submariner Date ref. 16610 from 1998. Excellent condition with original box, papers, and service history. Classic diving watch with timeless appeal.',
    photos: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
    ],
    status: 'active',
    createdAt: '2024-01-10T13:20:00Z',
    updatedAt: '2024-01-10T13:20:00Z',
  },
];

const STORAGE_KEY = 'marketplace_listings';

export function getListings(): Listing[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockListings));
  return mockListings;
}

export function saveListing(listing: Listing): void {
  const listings = getListings();
  const index = listings.findIndex(l => l.id === listing.id);
  if (index >= 0) {
    listings[index] = listing;
  } else {
    listings.unshift(listing);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function deleteListing(id: string): void {
  const listings = getListings().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function getPublicListings(): Listing[] {
  return getListings().filter(l => l.status === 'active' || l.status === 'reserved');
}

export function getListingById(id: string): Listing | undefined {
  return getListings().find(l => l.id === id);
}
