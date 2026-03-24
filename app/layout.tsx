import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.urbandesignindia.com';

export const metadata: Metadata = {
  title: "Urban Design India - Interior Design Portfolio",
  description: "Transform your space with Urban Design India's exceptional interior design services",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JZSQ4FYM27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JZSQ4FYM27');
          `}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
