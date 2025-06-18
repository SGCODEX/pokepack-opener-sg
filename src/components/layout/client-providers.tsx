
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';
import { ThemeProvider } from "@/contexts/theme-context";

export function ClientProviders({ children }: { children: ReactNode }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This ensures the year is updated on the client if it somehow differs,
    // but primarily, useState initializes it for SSR consistency.
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <ThemeProvider
      defaultTheme="dark" // This was the default as per previous setup
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
  );
}
