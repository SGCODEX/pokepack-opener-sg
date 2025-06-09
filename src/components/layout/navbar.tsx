"use client";

import Link from 'next/link';
import { Sparkles } from 'lucide-react'; // Example icon
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';

const navLinks = [
  { href: '/', label: 'Open Packs' },
  { href: '/pokedex', label: 'My Pokedex' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <Sparkles className="h-8 w-8 text-accent" />
            <span className="font-headline text-2xl font-bold">PokePack Opener</span>
          </Link>
          <nav className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-primary-foreground hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium",
                  pathname === link.href ? "bg-primary-foreground/20 text-accent-foreground" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
