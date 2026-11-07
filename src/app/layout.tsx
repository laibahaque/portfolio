import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Suspense } from "react";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { ClickSoundRoot } from "@/components/motion/ClickSoundRoot";
import { FluidCanvas } from "@/components/motion/FluidCanvas";
import { PageTransitionController } from "@/components/motion/PageTransitionController";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Splash } from "@/components/motion/Splash";
import { site } from "@/data/site";
import { jsonLdScript, personJsonLd } from "@/lib/jsonld";
import { ViewTransitionGuard } from "@/lib/viewTransitionGuard";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#F3EFE7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Laiba Haque — Game Developer in Karachi",
    template: "%s — Laiba Haque",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.linkedin }],
  creator: site.name,
  category: "portfolio",
  alternates: { canonical: "/" },
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: site.name,
    title: "Laiba Haque — Game Developer in Karachi",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Laiba Haque — Game Developer in Karachi",
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <ViewTransitionGuard />
        <ContactModalProvider>
          <Splash />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <FluidCanvas />
          <PageTransitionController />
          <Suspense fallback={null}>
            <Navbar />
            <MotionRoot />
          </Suspense>
          {children}
          <Footer />
          <BackToTop />
          <ClickSoundRoot />
        </ContactModalProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }} />
      </body>
    </html>
  );
}
