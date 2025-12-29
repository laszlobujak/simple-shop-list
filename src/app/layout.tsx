import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Providers } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  title: {
    default: "Záloghitel és Értékbecslés | 2001 óta",
    template: "%s | Záloghitel és Értékbecslés",
  },
  description: "Korrekt értékbecslés, nyugodt döntések. Szakértői becslés, záloghitel, felvásárlás. VIP házhoz megy szolgáltatás.",
  keywords: ["záloghitel", "értékbecslés", "ékszer", "óra", "műtárgy", "felvásárlás", "beszámítás", "piactér"],
  authors: [{ name: "Záloghitel és Értékbecslés" }],
  creator: "Záloghitel és Értékbecslés",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Záloghitel és Értékbecslés",
    title: "Záloghitel és Értékbecslés | 2001 óta",
    description: "Korrekt értékbecslés, nyugodt döntések. Szakértői becslés, záloghitel, felvásárlás. VIP házhoz megy szolgáltatás.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Záloghitel és Értékbecslés | 2001 óta",
    description: "Korrekt értékbecslés, nyugodt döntések. Szakértői becslés, záloghitel, felvásárlás. VIP házhoz megy szolgáltatás.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

