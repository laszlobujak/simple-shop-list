import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getListingByIdCached, getPublicListingsCached } from '@/lib/listings-cached';
import { CATEGORY_LABELS } from '@/types/listing';
import { ListingPhotoGallery } from '@/components/listings/ListingPhotoGallery';
import { ListingDetails } from '@/components/listings/ListingDetails';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cache } from 'react';

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all active/reserved listings at build time
export async function generateStaticParams() {
  const listings = await getPublicListingsCached();

  // Pre-render ALL listings (not just top 50)
  return listings.map((listing) => ({
    id: listing.id,
  }));
}

// Use React cache() to deduplicate getListingByIdCached calls within a single request
const getCachedListing = cache(async (id: string) => {
  return await getListingByIdCached(id);
});

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getCachedListing(id);

  if (!listing || (listing.status !== 'active' && listing.status !== 'reserved')) {
    return {
      title: 'Listing Not Found',
      description: 'This listing is no longer available.',
    };
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const price = formatPrice(listing.price);
  const category = CATEGORY_LABELS[listing.category];
  const description = listing.description || `${category} available for ${price}`;

  return {
    title: `${listing.title} - Estate & Co.`,
    description: description,
    openGraph: {
      title: listing.title,
      description: description,
      images: listing.photos.length > 0 ? [
        {
          url: listing.photos[0],
          alt: listing.title,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.title,
      description: description,
      images: listing.photos.length > 0 ? [listing.photos[0]] : [],
    },
  };
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getCachedListing(id);

  if (!listing || (listing.status !== 'active' && listing.status !== 'reserved')) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-sans text-sm">Back to collection</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <ListingPhotoGallery listing={listing} />
            <ListingDetails listing={listing} formatPrice={formatPrice} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

