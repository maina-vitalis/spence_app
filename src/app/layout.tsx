import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import QueryProvider from "@/util/ReactQueryProvider";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://spencecreations.co.ke"),
  title: "Spence Creation | Web Development & Design Agency",
  description:
    "Professional web development and design services specializing in modern, responsive websites, e-commerce solutions, and custom web applications. Transform your digital presence with Spence Creation.",
  keywords: [
    "web development",
    "web design",
    "e-commerce",
    "UI/UX design",
    "responsive websites",
    "custom web applications",
    "digital solutions",
  ],
  authors: [{ name: "Spence Creations's Team" }],
  creator: "Spence Creation",
  publisher: "Spence Creation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spencecreations.co.ke",
    title: "Spence Creations | Web Development & Design Agency",
    description:
      "Professional web development and design services specializing in modern, responsive websites, e-commerce solutions, and custom web applications.",
    siteName: "Spence Creation",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Spence Creation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spence Creation | Web Development & Design Agency",
    description:
      "Professional web development and design services specializing in modern, responsive websites, e-commerce solutions, and custom web applications.",
    images: ["/logo.png"],
    creator: "@spencecreations",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="System" enableSystem>
        <QueryProvider>
          <body className={`${inter.className} antialiased`}>
            <main className="max-w-[1300px] mx-auto px-3 scroll-smooth">
              <NavBar />
              {children}
              <Footer />
            </main>
          </body>
          <Toaster richColors position="top-right" visibleToasts={1} />
        </QueryProvider>
      </ThemeProvider>
    </html>
  );
}
