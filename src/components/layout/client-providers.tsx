
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';
import { ThemeProvider } from "@/contexts/theme-context";
import { LoadingProvider, LoadingContext } from '@/contexts/loading-context';
import { PageLoader } from '@/components/layout/page-loader';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/auth-context';


// Main exported component
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="pokepack-opener-theme"
      >
        <LoadingProvider>
          <AppContent>{children}</AppContent>
        </LoadingProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Internal component to manage layout and loading state
function AppContent({ children }: { children: ReactNode }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const loadingCtx = useContext(LoadingContext);

  if (!loadingCtx) {
    // This should ideally not happen if AppContent is always rendered within LoadingProvider
    throw new Error("LoadingContext not found. AppContent must be used within a LoadingProvider.");
  }
  const { isLoading, showLoader, hideLoader } = loadingCtx;

  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Initial load effect
  useEffect(() => {
    showLoader();
    const timer = setTimeout(hideLoader, 750); // Show for 750ms on initial load
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency: run once on mount. showLoader/hideLoader are stable.

  // Navigation change effect
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      showLoader();
      prevPathnameRef.current = pathname; // Update ref *after* showing loader
      const timer = setTimeout(hideLoader, 500); // Show for 500ms on navigation
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Rerun if pathname changes. showLoader/hideLoader are stable.

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Ensure Container takes up significant height for loader centering */}
        <Container className="py-8 min-h-[calc(100vh-12rem)] flex flex-col"> {/* Adjust 12rem based on nav+footer */}
          {isLoading ? <PageLoader /> : children}
        </Container>
      </main>
      <Toaster />
      <footer className="bg-primary/10 text-center py-4">
        <Container>
          <p className="text-sm text-foreground/80">&copy; {currentYear} PokePack Opener. Gotta open 'em all!</p>
        </Container>
      </footer>
    </>
  );
}
