
"use client";

import Link from 'next/link';
import { Sparkles, Users } from 'lucide-react'; // Added Users icon for My Team
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';
import dynamic from 'next/dynamic';

// Dynamically import ThemeToggleButton to make it client-side only
const ThemeToggleButton = dynamic(() =>
  import('@/components/theme-toggle-button').then(mod => mod.ThemeToggleButton),
  { ssr: false }
);

const navLinks = [
  { href: '/', label: 'Open Packs' },
  { href: '/pokedex', label: 'My Pokedex' },
  { href: '/my-team', label: 'My Team' }, // New link
];

export function Navbar() {
  const pathname = usePathname();
  const pokemonBlueBg = "bg-[hsl(217,91%,60%)]"; // Pokémon Blue
  const activeLinkBg = "bg-[hsl(217,91%,50%)]"; // Darker Pokémon Blue

  return (
    <header className={cn(pokemonBlueBg, "shadow-md sticky top-0 z-50")}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
            <Sparkles className="h-8 w-8 text-primary" /> {/* Yellow Sparkle */}
            <span className="font-pokemonlogo text-3xl text-primary tracking-wider">PokePack Opener SG</span> {/* Pokemon Font, Yellow */}
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden sm:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-primary hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center", // Yellow text, hover to white, flex for icon
                    pathname === link.href ? cn(activeLinkBg, "text-white") : "" // Active: Darker blue BG, white text
                  )}
                >
                  {link.label === 'My Team' && <Users className="mr-1.5 h-4 w-4" />} {/* Icon for My Team */}
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggleButton /> {/* ThemeToggleButton will adapt its internal styling */}
          </div>
        </div>
        {/* Mobile navigation links */}
        <nav className="sm:hidden flex items-center justify-around space-x-1 py-2 border-t border-primary/30"> {/* Yellowish border */}
            {navLinks.map((link) => (
            <Link
                key={link.href + "-mobile"}
                href={link.href}
                className={cn(
                  "text-primary hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium flex-1 text-center flex items-center justify-center", // Yellow text, hover to white, flex for icon
                  pathname === link.href ? cn(activeLinkBg, "text-white") : "" // Active: Darker blue BG, white text
                )}
            >
                {link.label === 'My Team' && <Users className="mr-1.5 h-4 w-4" />} {/* Icon for My Team */}
                {link.label}
            </Link>
            ))}
        </nav>
      </Container>
    </header>
  );
}
