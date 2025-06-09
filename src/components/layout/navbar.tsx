
"use client";

import Link from 'next/link';
import { Sparkles, LogIn, LogOut, UserCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const navLinks = [
  { href: '/', label: 'Open Packs' },
  { href: '/pokedex', label: 'My Pokedex' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const getAvatarFallback = (displayName?: string | null) => {
    if (!displayName) return "U";
    const parts = displayName.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };


  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <Sparkles className="h-8 w-8 text-accent" />
            <span className="font-headline text-2xl font-bold">PokePack Opener</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-1">
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
            
            {loading ? (
              <div className="h-8 w-20 bg-primary-foreground/20 animate-pulse rounded-md"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-9 w-9 border-2 border-accent">
                       <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                      <AvatarFallback>{getAvatarFallback(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {user.displayName || "Welcome"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/pokedex')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>My Pokedex</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" onClick={() => router.push('/login')} className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-accent">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
             {/* Mobile nav items for quick access */}
             <nav className="md:hidden flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + "-mobile"}
                  href={link.href}
                  className={cn(
                    "text-primary-foreground hover:text-accent transition-colors px-2 py-1 rounded-md text-xs font-medium",
                     pathname === link.href ? "bg-primary-foreground/20 text-accent-foreground" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
