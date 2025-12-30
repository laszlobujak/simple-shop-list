'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ListingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Listing error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-foreground">
            Unable to load listing
          </h1>
          <p className="text-muted-foreground font-sans">
            This listing could not be loaded. It may have been removed or there was an error retrieving the details.
          </p>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
          >
            Try again
          </Button>
          <Link href="/piacter">
            <Button variant="outline">
              Vissza a piactérre
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

