import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold text-foreground">Estate & Co.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Curated luxury consignment since 1985
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-muted-foreground">
              123 Antique Row, Charleston, SC 29401
            </p>
            <a 
              href="tel:+1234567890" 
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              (123) 456-7890
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Estate & Co. All rights reserved.
          </p>
          <Link 
            href="/admin" 
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
