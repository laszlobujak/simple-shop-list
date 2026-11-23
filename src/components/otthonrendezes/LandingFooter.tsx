'use client';

import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="bg-plum-deep text-white/70">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Értékbecslés &amp; Zálog · 2001 óta</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/adatvedelem" className="border-b border-white/30 hover:text-white">
              Adatkezelési tájékoztató
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
