import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const siteUrl = "https://amritbhusal1.com.np";
const siteName = "Amrit Bhusal - Frontend Engineer | React & Next.js";
const siteDescription = "Frontend Engineer based in Nepal helping startups and businesses build high-performance web applications with React, Next.js, and TypeScript. 3+ years experience delivering scalable SaaS, eCommerce, and business platforms that convert users into customers.";

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: siteName,
    template: `%s | Amrit Bhusal`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Amrit Bhusal", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "Amrit Bhusal",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer Nepal",
    "Lalitpur Developer",
    "Freelance Frontend Developer",
    "Hire React Developer Nepal",
    "SaaS Developer",
    "eCommerce Developer",
    "Startup MVP Developer",
    "Frontend Performance Optimization",
    "Scalable Web Applications",
    "Figma to Code",
    "Core Web Vitals",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Amrit Bhusal",
  publisher: "Amrit Bhusal",

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/profile.jpg`,
        width: 1200,
        height: 630,
        alt: "Amrit Bhusal - Frontend Developer",
        type: "image/jpeg",
      },
      {
        url: `${siteUrl}/profile.jpg`,
        width: 600,
        height: 600,
        alt: "Amrit Bhusal Profile Picture",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/profile.jpg`],
    creator: "@AmritBhusal",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/profile.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  manifest: "/manifest.json",

  // Verification for search engines (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Category
  category: "technology",
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d1117" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

// JSON-LD structured data for rich snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amrit Bhusal",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  sameAs: [
    "https://github.com/AmritBhusal",
    "https://www.linkedin.com/in/amrit-bhusal1/",
    "https://www.facebook.com/profile.php?id=61554990321890",
    "https://www.instagram.com/bhusalamrit14/",
  ],
  jobTitle: "Frontend Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lalitpur",
    addressCountry: "Nepal",
  },
  description: siteDescription,
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "SaaS Development",
    "eCommerce Development",
    "Frontend Performance Optimization",
    "Core Web Vitals",
    "Scalable Web Applications",
    "Figma to Code",
    "SSR/SSG",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <main>
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}