
"use client";

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button'; // Imported Button to style ThemeToggleButton

const navLinks = [
  { href: '/', label: 'Open Packs' },
  { href: '/pokedex', label: 'My Pokedex' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-primary-foreground shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Sparkles className="h-8 w-8 text-accent" />
            <span className="font-headline text-2xl font-bold">PokePack Opener</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden sm:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-primary hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium",
                    pathname === link.href ? "bg-primary/10 text-accent" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Apply custom styling for ThemeToggleButton to fit new navbar theme */}
            <ThemeToggleButton />
            {/* Mobile Menu (can be added later if needed using Sheet component) */}
          </div>
        </div>
        {/* Mobile navigation links */}
        <nav className="sm:hidden flex items-center justify-around space-x-1 py-2 border-t border-primary/20">
            {navLinks.map((link) => (
            <Link
                key={link.href + "-mobile"}
                href={link.href}
                className={cn(
                "text-primary hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium flex-1 text-center",
                pathname === link.href ? "bg-primary/10 text-accent" : ""
                )}
            >
                {link.label}
            </Link>
            ))}
        </nav>
      </Container>
    </header>
  );
}
