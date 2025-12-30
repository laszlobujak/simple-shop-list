'use client';

import { useState } from 'react';
import { Listing, ListingCategory, CATEGORY_LABELS } from '@/types/listing';
import { ListingGrid } from './ListingGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ListingSearchProps {
  initialListings: Listing[];
}

const categories: (ListingCategory | 'all')[] = ['all', 'jewelry', 'watches', 'art', 'furniture', 'collectibles', 'antiques'];

export function ListingSearch({ initialListings }: ListingSearchProps) {
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = initialListings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      listing.title.toLowerCase().includes(query) || 
      listing.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Keresés cím vagy leírás alapján..."
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
            size="default"
            onClick={() => setSelectedCategory(cat)}
            className="font-sans text-sm uppercase tracking-wider px-6 py-3"
          >
            {cat === 'all' ? 'Összes' : CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      <ListingGrid listings={filteredListings} />
    </>
  );
}

