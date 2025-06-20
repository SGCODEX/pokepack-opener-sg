
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link'; // For minimal header
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';
import { ThemeProvider } from "@/contexts/theme-context";
import { LoadingProvider, LoadingContext } from '@/contexts/loading-context';
import { PageLoader } from '@/components/layout/page-loader';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { AuthProvider, useAuth } from '@/contexts/auth-context'; // Added useAuth
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react'; // For minimal header

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
  const loadingCtx = useContext(LoadingContext);
  if (!loadingCtx) {
    throw new Error("LoadingContext not found. AppContent must be used within a LoadingProvider.");
  }
  const { isLoading: isPageTransitionLoading, showLoader, hideLoader } = loadingCtx;

  const { user, loading: isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Initial page load effect for page transitions
  useEffect(() => {
    showLoader();
    const timer = setTimeout(hideLoader, 750); 
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Navigation change effect for page transitions
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      showLoader();
      prevPathnameRef.current = pathname; 
      const timer = setTimeout(hideLoader, 500); 
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Authentication and redirection logic
  useEffect(() => {
    if (isAuthLoading) {
      return; // Wait for authentication to resolve
    }

    if (!user && pathname !== '/login') {
      router.push('/login');
    } else if (user && pathname === '/login') {
      router.push('/');
    }
  }, [user, isAuthLoading, pathname, router]);


  // Render a global loader if authentication is in progress,
  // or if a redirect is imminent.
  if (isAuthLoading || (!isAuthLoading && !user && pathname !== '/login') || (!isAuthLoading && user && pathname === '/login')) {
    return (
        <>
            <header className="bg-[hsl(217,91%,60%)] shadow-md sticky top-0 z-50">
              <Container>
                <div className="flex items-center justify-between h-16">
                   <Link href="/" passHref className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
                      <Sparkles className="h-8 w-8 text-primary" />
                      <span className="font-pokemonlogo text-3xl text-primary tracking-wider">PokePack Opener SG</span>
                   </Link>
                </div>
              </Container>
            </header>
            <main className="flex-grow">
                <Container className="py-8 min-h-[calc(100vh-12rem)] flex flex-col">
                    <PageLoader />
                </Container>
            </main>
            <footer className={cn("bg-[hsl(217,91%,60%)] text-center py-4 relative z-40")}>
                <Container>
                    <a
                        href="https://github.com/SGCODEX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("text-sm font-medium text-white hover:underline transition-colors")}
                    >
                        © 2025 PokePack Opener SG. Made by SGCODEX
                    </a>
                </Container>
            </footer>
        </>
    );
  }

  // If authenticated and on a protected page, or not authenticated and on the login page:
  return (
    <>
      <Navbar /> 
      <main className="flex-grow">
        <Container className="py-8 min-h-[calc(100vh-12rem)] flex flex-col">
          {isPageTransitionLoading ? <PageLoader /> : children}
        </Container>
      </main>
      <Toaster />
      <footer className={cn("bg-[hsl(217,91%,60%)] text-center py-4 relative z-40")}>
        <Container>
          <a
            href="https://github.com/SGCODEX"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-sm font-medium text-white hover:underline transition-colors")}
          >
            © 2025 PokePack Opener SG. Made by SGCODEX
          </a>
        </Container>
      </footer>
    </>
  );
}
