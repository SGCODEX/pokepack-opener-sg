
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Import cn for conditional styling

export function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, loading } = useAuth(); // Assuming useAuth is available or not needed here directly for styling
                                        // If navbar context is needed, it should be passed or handled differently

  // Determine if the navbar is dark (based on primary-foreground being used as bg)
  // This is a proxy, ideally, this would come from a context or prop if navbar bg can change dynamically
  // For now, we assume if the parent header uses 'bg-primary-foreground', we adapt.
  // A more robust way might be to pass a 'variant' prop to ThemeToggleButton from Navbar.
  const isNavbarDarkStyle = true; // Assuming the new dark navbar style is active

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            // Default outline styles are fine if not on dark-navbar
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

// Minimal useAuth hook stub if not already globally available or needed for this specific component logic
// This is just to prevent breaking if useAuth was accidentally left from a copy-paste.
// Real useAuth is in contexts/auth-context.
const useAuth = () => ({ user: null, loading: true });
