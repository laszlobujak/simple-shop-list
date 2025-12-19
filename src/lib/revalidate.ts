import { revalidatePath } from 'next/cache';

export async function revalidateListings() {
  // Revalidate homepage
  revalidatePath('/', 'page');

  // Revalidate all listing detail pages
  revalidatePath('/listing/[id]', 'page');

  console.log('[Cache] Revalidated homepage and listing pages');
}

export async function revalidateListingById(id: string) {
  // Revalidate specific listing page
  revalidatePath(`/listing/${id}`, 'page');

  // Also revalidate homepage (listing might appear there)
  revalidatePath('/', 'page');

  console.log(`[Cache] Revalidated listing ${id} and homepage`);
}
