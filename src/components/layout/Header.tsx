import Link from "next/link";
import { Phone } from "lucide-react";
import { MobileMenuToggle } from "./MobileMenuToggle";

const NAV_LINKS = [
  { href: "/ai-ertekbecslo", label: "AI értékbecslés" },
  { href: "/piacter", label: "Piactér" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

const PHONE_NUMBER = "+36 1 234 5678";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Értékbecslés & Zálog
            </span>
          </Link>

          <nav className="flex items-center gap-6 lg:gap-8">
            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Phone - Desktop */}
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline font-sans text-sm">
                {PHONE_NUMBER}
              </span>
            </a>

            {/* Mobile Menu Toggle - Client Component */}
            <MobileMenuToggle links={NAV_LINKS} phoneNumber={PHONE_NUMBER} />
          </nav>
        </div>
      </div>
    </header>
  );
}
