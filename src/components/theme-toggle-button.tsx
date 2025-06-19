
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from '@/contexts/auth-context'; // Corrected import

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // const { user, loading } = useAuth(); // Available if needed, but not used in current logic
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Navbar is now styled with a dark background consistently
  const isNavbarDarkStyle = true; 

  if (!mounted) {
    // Render a placeholder to avoid hydration mismatch on the button itself.
    // It's styled to be like the dark-mode button but made invisible until mounted.
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn(
            "text-primary border-primary hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:ring-primary", // Base style for dark navbar
            "opacity-0 pointer-events-none" // Make it invisible and non-interactive initially
        )}
        aria-hidden="true" 
      >
        {/* Render a consistent icon initially, it will be updated on mount if needed */}
        <Sun className="h-[1.2rem] w-[1.2rem]" /> 
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            // When on dark-navbar, override colors for visibility
            isNavbarDarkStyle && "text-primary border-primary hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:ring-primary"
          )}
        >
          {resolvedTheme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} disabled={theme === "light"}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} disabled={theme === "dark"}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Removed the local stub for useAuth as it's now imported from context.
