import { z } from 'zod';

// Enums
export const listingStatusSchema = z.enum(['draft', 'active', 'reserved', 'sold', 'inactive']);

export const listingCategorySchema = z.enum([
  'jewelry',
  'watches',
  'art',
  'furniture',
  'collectibles',
  'antiques',
  'fashion',
  'other',
]);

// Image URL validation with whitelist
const imageUrlSchema = z.string().url().refine(
  (url) => {
    try {
      const urlObj = new URL(url);
      const allowedDomains = [
        'images.unsplash.com',
        'unsplash.com',
        'imgur.com',
        'i.imgur.com',
        'cloudinary.com',
        'res.cloudinary.com',
      ];

      return (
        urlObj.protocol === 'https:' &&
        allowedDomains.some(
          (domain) => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
        )
      );
    } catch {
      return false;
    }
  },
  {
    message: 'Image URL must be HTTPS and from an allowed domain (Unsplash, Imgur, or Cloudinary)',
  }
);

// Base listing schema (without ID and timestamps)
export const createListingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  category: listingCategorySchema,
  price: z.number()
    .positive('Price must be greater than 0')
    .max(10000000, 'Price is too high'),
  description: z.string().max(5000, 'Description must be less than 5000 characters'),
  photos: z.array(imageUrlSchema).max(20, 'Maximum 20 photos allowed'),
  status: listingStatusSchema,
});

// Update listing schema (all fields optional except required ones)
export const updateListingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  category: listingCategorySchema.optional(),
  price: z.number().positive('Price must be greater than 0').max(10000000, 'Price is too high').optional(),
  description: z.string().max(5000, 'Description must be less than 5000 characters').optional(),
  photos: z.array(imageUrlSchema).max(20, 'Maximum 20 photos allowed').optional(),
  status: listingStatusSchema.optional(),
});

// Full listing schema (with ID and timestamps)
export const listingSchema = createListingSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Infer TypeScript types from schemas
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingOutput = z.infer<typeof listingSchema>;
export type ListingStatus = z.infer<typeof listingStatusSchema>;
export type ListingCategory = z.infer<typeof listingCategorySchema>;

// Helper function to validate and parse data
export function validateCreateListing(data: unknown): CreateListingInput {
  return createListingSchema.parse(data);
}

export function validateUpdateListing(data: unknown): UpdateListingInput {
  return updateListingSchema.parse(data);
}

export function validateListing(data: unknown): ListingOutput {
  return listingSchema.parse(data);
}

// Safe parse versions (returns error instead of throwing)
export function safeValidateCreateListing(data: unknown) {
  return createListingSchema.safeParse(data);
}

export function safeValidateUpdateListing(data: unknown) {
  return updateListingSchema.safeParse(data);
}

export function safeValidateListing(data: unknown) {
  return listingSchema.safeParse(data);
}
