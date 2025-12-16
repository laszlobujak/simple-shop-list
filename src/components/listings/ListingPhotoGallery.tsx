'use client';

import { useState } from 'react';
import { Listing } from '@/types/listing';

interface ListingPhotoGalleryProps {
  listing: Listing;
}

export function ListingPhotoGallery({ listing }: ListingPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
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
  );
}

