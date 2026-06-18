import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudzy Laundromat — Wash, Weigh & Fold · Orange, NJ",
  description:
    "City of Orange's clean, busy corner laundromat. Self-service wash & dry, wash-and-fold by weight. 51 Main St. Open early, open late.",
  openGraph: {
    title: "Sudzy Laundromat — Orange, NJ",
    description: "Clean and well kept. Wash · weigh · fold. 51 Main St, City of Orange.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0b0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fontshare — agency-tier type (Clash Display + Satoshi), keyless CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700,500&f[]=satoshi@400,500,700&f[]=cabinet-grotesk@800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
