import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";


export const metadata: Metadata = {
  title: "Amrit Bhusal",
  description: "As a front-end developer from Nepal, I specialize in Next.js, TypeScript, and Tailwind CSS. My portfolio showcases responsive and dynamic web applications that highlight my expertise in creating user-centric designs and writing clean, efficient code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}