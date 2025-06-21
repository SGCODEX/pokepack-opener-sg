
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link'; 
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';
import { ThemeProvider } from "@/contexts/theme-context";
import { LoadingProvider, LoadingContext } from '@/contexts/loading-context';
import { PageLoader } from '@/components/layout/page-loader';
import { usePathname, useRouter } from 'next/navigation'; 
import { AuthProvider, useAuth } from '@/contexts/auth-context'; 
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react'; 

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

  // Determine what to display in the main content area
  let contentToDisplay: ReactNode;
  if (isAuthLoading || (!isAuthLoading && !user && pathname !== '/login') || (!isAuthLoading && user && pathname === '/login')) {
    // Show PageLoader if:
    // 1. Authentication is still loading.
    // 2. Auth is resolved, but user is not logged in and not on the login page (redirection pending).
    // 3. Auth is resolved, user is logged in and on the login page (redirection pending).
    contentToDisplay = <PageLoader />;
  } else {
    // Auth is resolved and user is in a stable state for the current page.
    // Show PageLoader during page transitions, otherwise show the actual page children.
    contentToDisplay = isPageTransitionLoading ? <PageLoader /> : children;
  }

  // Render a consistent layout shell. Navbar and Toaster are always rendered.
  // The Navbar component itself handles its internal display logic based on authentication state.
  return (
    <>
      <Navbar /> 
      <main className="flex-grow flex flex-col">
        <Container className={cn(
            "flex-grow flex flex-col",
            pathname === '/surprise' ? 'pt-8 pb-2' : 'py-8'
          )}>
          {contentToDisplay}
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
