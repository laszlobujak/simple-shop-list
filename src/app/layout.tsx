import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Estate & Co. - Curated Treasures",
  description: "Discover exceptional pieces from our carefully appraised collection. Each item tells a story of craftsmanship and timeless elegance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

