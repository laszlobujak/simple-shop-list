import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getListingById } from '@/data/mockListings';
import { Listing, CATEGORY_LABELS } from '@/types/listing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone } from 'lucide-react';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = getListingById(id);
      if (found && (found.status === 'active' || found.status === 'reserved')) {
        setListing(found);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!listing) {
    return <Navigate to="/" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-sans text-sm">Back to collection</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Photo Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                <img
                  src={listing.photos[selectedPhoto]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {listing.photos.length > 1 && (
                <div className="flex gap-3">
                  {listing.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhoto(index)}
                      className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedPhoto === index ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
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
                      Reserved
                    </Badge>
                  )}
                </div>
              </div>

              <p className="font-serif text-3xl text-foreground">
                {formatPrice(listing.price)}
              </p>

              <div className="border-t border-border pt-6">
                <h2 className="font-sans text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  Description
                </h2>
                <p className="font-sans text-foreground leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* CTA */}
              <div className="border-t border-border pt-6 space-y-4">
                <p className="font-sans text-sm text-muted-foreground">
                  Interested in this piece? Contact our specialists to arrange a viewing or learn more.
                </p>
                <a href="tel:+1234567890" className="block">
                  <Button size="lg" className="w-full font-sans gap-2">
                    <Phone className="h-4 w-4" />
                    Call (123) 456-7890
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
