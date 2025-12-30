import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-serif">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Az oldal nem található</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Vissza a főoldalra
        </Link>
      </div>
    </div>
  );
}

