import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPublicListings } from '@/data/mockListings';
import { ListingSearch } from '@/components/listings/ListingSearch';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const listings = getPublicListings();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
              Curated Treasures
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional pieces from our carefully appraised collection. 
              Each item tells a story of craftsmanship and timeless elegance.
            </p>
          </div>
        </section>

        {/* Listings Section */}
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <ListingSearch initialListings={listings} />
        </section>

        {/* Contact Section */}
        <section className="bg-card border-t border-border">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
              Interested in an Item?
            </h2>
            <p className="font-sans text-muted-foreground mb-6 max-w-xl mx-auto">
              Our specialists are available to answer your questions and arrange viewings. 
              Contact us to learn more about any piece in our collection.
            </p>
            <a href="tel:+1234567890">
              <Button size="lg" className="font-sans">
                Call (123) 456-7890
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

