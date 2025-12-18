import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Providers } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Estate & Co. - Curated Treasures",
    template: "%s | Estate & Co.",
  },
  description: "Discover exceptional pieces from our carefully appraised collection. Each item tells a story of craftsmanship and timeless elegance.",
  keywords: ["estate sale", "antiques", "vintage", "collectibles", "furniture", "home decor"],
  authors: [{ name: "Estate & Co." }],
  creator: "Estate & Co.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Estate & Co.",
    title: "Estate & Co. - Curated Treasures",
    description: "Discover exceptional pieces from our carefully appraised collection. Each item tells a story of craftsmanship and timeless elegance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estate & Co. - Curated Treasures",
    description: "Discover exceptional pieces from our carefully appraised collection. Each item tells a story of craftsmanship and timeless elegance.",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

