'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold text-foreground">Értékbecslés & Zálog</p>
            <p className="text-sm text-muted-foreground mt-1">
              Szakértői értékbecslés 2001 óta
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Nyugati pályaudvar környéke, Budapest</span>
            </div>
            <a
              href="tel:+3613540555"
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              +36 1 354 0555
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Értékbecslés & Zálog. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/adatvedelem"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Adatvédelem
            </Link>
            <Link
              href="/felhasznalasi-feltetelek"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Feltételek
            </Link>
            <Link
              href="/admin"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
