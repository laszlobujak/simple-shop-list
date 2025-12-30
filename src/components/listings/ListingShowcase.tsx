import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Listing } from '@/types/listing';

interface ListingShowcaseProps {
  listings: Listing[];
  maxItems?: number;
}

export function ListingShowcase({ listings, maxItems = 4 }: ListingShowcaseProps) {
  const displayListings = listings.slice(0, maxItems);

  if (displayListings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Jelenleg nincsenek elérhető termékek.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayListings.map((listing) => {
          const mainImage = listing.photos?.[0];
          const price = listing.price ? `${listing.price.toLocaleString('hu-HU')} Ft` : 'Ár egyeztetés alapján';

          return (
            <Link key={listing.id} href={`/piacter/${listing.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full group">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-sm">Nincs kép</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {listing.title}
                  </h3>
                  {listing.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {listing.description}
                    </p>
                  )}
                  <p className="font-semibold text-accent">{price}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link href="/piacter">
          <Button size="lg" variant="outline" className="text-base border-2">
            Összes termék megtekintése
          </Button>
        </Link>
      </div>
    </div>
  );
}
