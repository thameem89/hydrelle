import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Hydrelle Skincare',
    default: 'Hydrelle Skincare | Radiance Redefined',
  },
  description: 'Premium botanical skincare combining clinical precision with natural, organic beauty. Discover advanced serums, oils, and exfoliants for a youthful, radiant glow.',
  keywords: ['skincare', 'botanical skincare', 'clinical skincare', 'face serum', 'organic beauty', 'anti-aging', 'Hydrelle', 'Korean skincare'],
  authors: [{ name: 'Hydrelle' }],
  creator: 'Hydrelle',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://hydrelleskincare.com',
    title: 'Hydrelle Skincare | Radiance Redefined',
    description: 'Premium botanical skincare combining clinical precision with natural, organic beauty.',
    siteName: 'Hydrelle',
    images: [
      {
        url: 'https://hydrelleskincare.com/assets/1-2fFCd1oU.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'Hydrelle Skincare Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydrelle Skincare | Radiance Redefined',
    description: 'Premium botanical skincare combining clinical precision with natural, organic beauty.',
    images: ['https://hydrelleskincare.com/assets/1-2fFCd1oU.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
