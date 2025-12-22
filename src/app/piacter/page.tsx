import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPublicListingsCached } from '@/lib/listings-cached';
import { ListingSearch } from '@/components/listings/ListingSearch';

export const metadata = {
  title: 'Piactér - Értéktárgyak',
  description: 'Tekintse meg piacterünkön elérhető értéktárgyainkat. Minden darab szakértői becslés alapján kerül értékesítésre.',
};

export default async function PiacterPage() {
  const listings = await getPublicListingsCached();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Piacterünk
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tekintse meg szakértői értékbecslés alapján értékesített tárgyainkat.
                Minden darab gondosan kiválasztott, hiteles dokumentációval rendelkezik.
              </p>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <ListingSearch initialListings={listings} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
