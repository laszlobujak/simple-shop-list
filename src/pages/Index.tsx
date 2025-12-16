import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { getPublicListings } from '@/data/mockListings';
import { Listing, ListingCategory, CATEGORY_LABELS } from '@/types/listing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const categories: (ListingCategory | 'all')[] = ['all', 'jewelry', 'watches', 'art', 'furniture', 'collectibles', 'antiques'];

export default function Index() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setListings(getPublicListings());
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      listing.title.toLowerCase().includes(query) || 
      listing.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

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
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-sans"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="font-sans text-xs uppercase tracking-wider"
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
              </Button>
            ))}
          </div>

          <ListingGrid listings={filteredListings} />
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
