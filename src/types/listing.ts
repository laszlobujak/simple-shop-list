export type ListingStatus = 'draft' | 'active' | 'reserved' | 'sold' | 'inactive';

export type ListingCategory = 
  | 'jewelry'
  | 'watches'
  | 'art'
  | 'furniture'
  | 'collectibles'
  | 'antiques'
  | 'fashion'
  | 'other';

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  price: number;
  description: string;
  photos: string[];
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  jewelry: 'Jewelry',
  watches: 'Watches',
  art: 'Art',
  furniture: 'Furniture',
  collectibles: 'Collectibles',
  antiques: 'Antiques',
  fashion: 'Fashion',
  other: 'Other',
};

export const STATUS_LABELS: Record<ListingStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  reserved: 'Reserved',
  sold: 'Sold',
  inactive: 'Inactive',
};
