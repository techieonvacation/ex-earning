import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import { ThemeProvider } from "./lib/theme-provider";
import { inter, dmSans, spaceGrotesk, urbanist } from "./lib/fonts";
import ConditionalFooter from "./components/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./components/ui/Cart";

export const metadata: Metadata = {
  title: "Excellent Earning",
  description: "Excellent Earning",
  keywords:
    "Excellent Earning",
  authors: [{ name: "Excellent Earning" }],
  robots: "index, follow",
  openGraph: {
    title: "Excellent Earning",
    description: "Excellent Earning",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excellent Earning",
    description: "Excellent Earning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('excellent-earning-theme') || 'light';
                document.documentElement.classList.add(theme);
              } catch (e) {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${urbanist.variable} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="excellent-earning-theme">
          <CartProvider>
            <ConditionalNavbar />
            <main>{children}</main>
            <ConditionalFooter />
          </CartProvider>
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
