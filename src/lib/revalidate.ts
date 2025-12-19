import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateListings() {
  // Invalidate cache tags for instant updates with React 19 "use cache"
  // Using 'max' profile to invalidate immediately
  revalidateTag('all-listings', 'max');
  revalidateTag('public-listings', 'max');

  // Also revalidate paths for page-level cache
  revalidatePath('/', 'page');
  revalidatePath('/listing/[id]', 'page');
  revalidatePath('/admin/dashboard', 'page');

  console.log('[Cache] Revalidated all listings via tags and paths');
}

export async function revalidateListingById(id: string) {
  // Invalidate cache tag for this specific listing
  revalidateTag(`listing-${id}`, 'max');

  // Also invalidate all listings and public listings since this listing appears in both
  revalidateTag('all-listings', 'max');
  revalidateTag('public-listings', 'max');

  // Revalidate paths for page-level cache
  revalidatePath(`/listing/${id}`, 'page');
  revalidatePath('/', 'page');
  revalidatePath('/admin/dashboard', 'page');

  console.log(`[Cache] Revalidated listing ${id} via tags and paths`);
}
