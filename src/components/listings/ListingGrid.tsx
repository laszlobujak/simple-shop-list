import { Listing } from '@/types/listing';
import { ListingCard } from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground font-sans">No items currently available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {listings.map((listing, index) => (
        <div 
          key={listing.id}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
}
