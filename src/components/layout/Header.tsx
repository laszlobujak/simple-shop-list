'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Értékbecslés & Zálog
            </span>
          </Link>

          <nav className="flex items-center gap-6 lg:gap-8">
            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#ai-ertekbecsles"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                AI értékbecslés
              </Link>
              <Link
                href="/piacter"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                Piactér
              </Link>
              <Link
                href="#kapcsolat"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                Kapcsolat
              </Link>
            </div>

            {/* Phone - Desktop */}
            <a
              href="tel:+3612345678"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline font-sans text-sm">+36 1 234 5678</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#ai-ertekbecsles"
                className="text-base font-medium text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI értékbecslés
              </Link>
              <Link
                href="/piacter"
                className="text-base font-medium text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Piactér
              </Link>
              <Link
                href="#kapcsolat"
                className="text-base font-medium text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kapcsolat
              </Link>
              <a
                href="tel:+3612345678"
                className="flex items-center gap-2 text-base font-medium text-accent hover:text-accent/80 transition-colors pt-2 border-t border-border"
              >
                <Phone className="h-4 w-4" />
                <span>+36 1 234 5678</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
