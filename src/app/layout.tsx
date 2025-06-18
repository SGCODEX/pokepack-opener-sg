
"use client"; // Required for useState and useEffect

import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';
import { ThemeProvider } from "@/contexts/theme-context";
import { useState, useEffect } from 'react';

// Metadata should be defined outside the component if it's static
// For dynamic metadata based on props, it's fine inside, but here it's static.
export const metadata: Metadata = {
  title: 'PokePack Opener',
  description: 'Open virtual Pokemon card packs and discover amazing cards!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This ensures the year is updated on the client if it somehow differs,
    // but primarily, useState initializes it for SSR consistency.
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider
          defaultTheme="dark"
          storageKey="pokepack-opener-theme"
        >
          <Navbar />
          <main className="flex-grow">
            <Container className="py-8">
              {children}
            </Container>
          </main>
          <Toaster />
          <footer className="bg-primary/10 text-center py-4">
            <Container>
              <p className="text-sm text-foreground/80">&copy; {currentYear} PokePack Opener. Gotta open 'em all!</p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
