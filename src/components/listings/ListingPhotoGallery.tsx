'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Listing } from '@/types/listing';

interface ListingPhotoGalleryProps {
  listing: Listing;
}

export function ListingPhotoGallery({ listing }: ListingPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-sm overflow-hidden relative">
        <Image
          src={listing.photos[selectedPhoto]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedPhoto === 0}
        />
      </div>
      
      {listing.photos.length > 1 && (
        <div className="flex gap-3">
          {listing.photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors relative ${
                selectedPhoto === index ? 'border-accent' : 'border-transparent'
              }`}
            >
              <Image
                src={photo}
                alt={`${listing.title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

