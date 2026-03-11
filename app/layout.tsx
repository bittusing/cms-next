import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Design India - Interior Design Portfolio",
  description: "Transform your space with Urban Design India's exceptional interior design services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
