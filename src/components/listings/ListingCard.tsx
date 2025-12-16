import Link from 'next/link';
import { Listing, CATEGORY_LABELS } from '@/types/listing';
import { Badge } from '@/components/ui/badge';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      href={`/listing/${listing.id}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-muted rounded-sm">
        <img
          src={listing.photos[0]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {listing.status === 'reserved' && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-accent text-accent-foreground font-sans text-xs"
          >
            Reserved
          </Badge>
        )}
      </div>
      
      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider">
          {CATEGORY_LABELS[listing.category]}
        </p>
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {listing.title}
        </h3>
        <p className="font-sans text-base text-foreground font-medium">
          {formatPrice(listing.price)}
        </p>
      </div>
    </Link>
  );
}
