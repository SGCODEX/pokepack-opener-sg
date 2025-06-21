
"use client";

import Link from 'next/link';
import { Sparkles, Users, User, Package, BookOpen, Home, Gift } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/auth-context'; // Import useAuth

const ThemeToggleButton = dynamic(() =>
  import('@/components/theme-toggle-button').then(mod => mod.ThemeToggleButton),
  { ssr: false }
);

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pack-selection', label: 'Open Packs', icon: Package },
  { href: '/pokedex', label: 'My Pokedex', icon: BookOpen },
  { href: '/surprise', label: 'Surprise', icon: Gift },
  { href: '/my-team', label: 'My Team', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth(); // Get auth state
  const pokemonBlueBg = "bg-[hsl(217,91%,60%)]";
  const activeLinkBg = "bg-[hsl(217,91%,50%)]";

  const isAuthenticated = !authLoading && user;

  return (
    <header className={cn(pokemonBlueBg, "shadow-md sticky top-0 z-50")}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity min-w-0">
            <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />
            <span className="font-pokemonlogo text-2xl lg:text-3xl text-primary tracking-wider truncate">PokePack Opener SG</span>
          </Link>
          <div className="flex items-center space-x-2 lg:space-x-4">
            {isAuthenticated && (
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-primary hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center",
                      pathname === link.href ? cn(activeLinkBg, "text-white") : ""
                    )}
                  >
                    {link.icon && <link.icon className="mr-1.5 h-4 w-4" />}
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
            <ThemeToggleButton />
          </div>
        </div>
        {/* Mobile navigation links - only if authenticated */}
        {isAuthenticated && (
          <nav className="lg:hidden flex items-center justify-around space-x-1 py-2 border-t border-primary/30">
              {navLinks.map((link) => (
              <Link
                  key={link.href + "-mobile"}
                  href={link.href}
                  className={cn(
                    "text-primary hover:text-white transition-colors px-2 py-2 rounded-md text-xs font-medium flex-1 text-center flex flex-col items-center justify-center h-16",
                    pathname === link.href ? cn(activeLinkBg, "text-white") : ""
                  )}
              >
                  {link.icon && <link.icon className="mb-0.5 h-5 w-5" />}
                  {link.label}
              </Link>
              ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
