import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../lib/theme-provider";
import { inter, dmSans, urbanist, spaceGrotesk } from "../lib/fonts";
import { SidebarProvider } from "../context/SidebarContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export const metadata: Metadata = {
  title: "Renderwise",
  description: "Global leading IT Company for all your needs",
  keywords:
    "IT, Renderwise, Renderwise AI, Renderwise AI Agent, Renderwise AI Agent, Renderwise AI Agent ",
  authors: [{ name: "Renderwise" }],
  robots: "index, follow",
  openGraph: {
    title: "Renderwise",
    description: "Global leading IT Company for all your needs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renderwise",
    description: "Global leading IT Company for all your needs",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${urbanist.variable} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="renderwise-theme">
          <SidebarProvider>
            <AdminDashboardLayout>{children}</AdminDashboardLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
