"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuToggleProps {
  links: NavLink[];
  phoneNumber: string;
}

export function MobileMenuToggle({ links, phoneNumber }: MobileMenuToggleProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-base font-medium text-accent hover:text-accent/80 transition-colors pt-2 border-t border-border"
              >
                <Phone className="h-4 w-4" />
                <span>{phoneNumber}</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

