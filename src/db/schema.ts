import { pgTable, text, timestamp, real, pgEnum } from 'drizzle-orm/pg-core';

export const listingStatusEnum = pgEnum('listing_status', [
  'draft',
  'active',
  'reserved',
  'sold',
  'inactive',
]);

export const listingCategoryEnum = pgEnum('listing_category', [
  'jewelry',
  'watches',
  'art',
  'furniture',
  'collectibles',
  'antiques',
  'fashion',
  'other',
]);

export const listings = pgTable('listings', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: listingCategoryEnum('category').notNull(),
  price: real('price').notNull(),
  description: text('description').notNull(),
  photos: text('photos').array().notNull().default([]),
  status: listingStatusEnum('status').notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
