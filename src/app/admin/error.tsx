'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-foreground">
            Admin Error
          </h1>
          <p className="text-muted-foreground font-sans">
            An error occurred in the admin panel. Please try again or contact support if the problem persists.
          </p>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono bg-muted px-3 py-2 rounded">
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
          <Button
            onClick={() => window.location.href = '/admin'}
            variant="outline"
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
}
