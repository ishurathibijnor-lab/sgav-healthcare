import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cartcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SGAV Healthcare",
  description: "Quality healthcare products by SGAV Healthcare.",
  verification: {
    google: "vSx7SVKzaS4bdxYGenF9YGIzLnzHX4eQfSHWJWe810Y",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
  <meta
    name="google-site-verification"
    content="vSx7SVKzaS4bdxYGenF9YGIzLnzHX4eQfSHWJWe810Y"
  />
</head>
<body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
