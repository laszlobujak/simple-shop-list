import Image from 'next/image';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

// Contacts for the home-preparation service (separate from the pawn shop line).
// The first one is primary: every "Hívjon minket" button calls it.
export const CONTACTS = [
  { name: 'András', display: '06 30 694 4299', href: '+36306944299' },
  { name: 'Évi', display: '+36 20 952 2665', href: '+36209522665' },
] as const;

export const PHONE = CONTACTS[0];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-plum/10 bg-linen/90 backdrop-blur supports-[backdrop-filter]:bg-linen/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/otthonrendezes" className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-plum text-white">
            <Home className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold text-plum-ink">
              Értékbecslés &amp; Zálog
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-plum-ink/60 sm:block">
              Megbízható segítség 2001 óta
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <a href="#szolgaltatasok" className="hidden text-[15px] text-plum-ink/80 hover:text-plum-ink md:block">
            Szolgáltatások
          </a>
          <a href="#folyamat" className="hidden text-[15px] text-plum-ink/80 hover:text-plum-ink md:block">
            Hogyan működik?
          </a>
          <a
            href={`tel:${PHONE.href}`}
            aria-label={`Hívjon minket: ${PHONE.display}`}
            className="flex items-center gap-2 rounded-full bg-plum px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-plum-deep sm:px-5"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Hívjon minket</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Rounded photo slot. Renders the image when `src` is given, otherwise a soft
 * tinted placeholder so the layout holds until real photos arrive.
 */
export function PhotoPanel({
  src,
  alt = '',
  className,
  tone = 'taupe',
  children,
  priority,
}: {
  src?: string;
  alt?: string;
  className?: string;
  tone?: 'taupe' | 'sage' | 'plum';
  children?: React.ReactNode;
  priority?: boolean;
}) {
  const toneClass = {
    taupe: 'bg-gradient-to-br from-linen-taupe to-[#D6CBC2]',
    sage: 'bg-gradient-to-br from-sage-deep to-[#CBD5C7]',
    plum: 'bg-gradient-to-b from-[#4A4056] via-plum to-plum-deep',
  }[tone];

  return (
    <div className={cn('relative overflow-hidden', toneClass, className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-semibold uppercase tracking-[0.22em] text-bronze', className)}>
      {children}
    </p>
  );
}
