import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Northern Corporation Limited | Knit to Fit Your World";
const siteDescription =
  "Established in 1987, Northern Corporation Limited bridges the gap between classic reliability and modern performance, manufacturing premium knitwear and activewear at a global scale.";
const siteUrl = "https://northerncorp.com";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | Northern Corporation Limited`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Northern Corporation Limited",
    locale: "en_US",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
