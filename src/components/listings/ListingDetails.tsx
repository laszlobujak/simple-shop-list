import { Listing, CATEGORY_LABELS } from '@/types/listing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface ListingDetailsProps {
  listing: Listing;
  formatPrice: (price: number) => string;
}

export function ListingDetails({ listing, formatPrice }: ListingDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider mb-2">
          {CATEGORY_LABELS[listing.category]}
        </p>
        <div className="flex items-start gap-3">
          <h1 className="font-serif text-3xl lg:text-4xl font-medium text-foreground flex-1">
            {listing.title}
          </h1>
          {listing.status === 'reserved' && (
            <Badge className="bg-accent text-accent-foreground font-sans text-xs">
              Foglalt
            </Badge>
          )}
        </div>
      </div>

      <p className="font-serif text-3xl text-foreground">
        {formatPrice(listing.price)}
      </p>

      <div className="border-t border-border pt-6">
        <h2 className="font-sans text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Leírás
        </h2>
        <p className="font-sans text-foreground leading-relaxed whitespace-pre-line">
          {listing.description}
        </p>
      </div>

      {/* CTA */}
      <div className="border-t border-border pt-6 space-y-4">
        <p className="font-sans text-sm text-muted-foreground">
          Érdekli ez a darab? Vegye fel velünk a kapcsolatot konzultációért vagy megtekintésért.
        </p>
        <a href="tel:+3613540555" className="block">
          <Button size="lg" className="w-full font-sans gap-2">
            <Phone className="h-4 w-4" />
            Hívás: +36 1 354 0555
          </Button>
        </a>
      </div>
    </div>
  );
}

