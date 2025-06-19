
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
import { cn } from "@/lib/utils";

export function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if the navbar context is dark (our blue navbar is dark)
  // This could be passed as a prop if navbar styles vary more widely
  const isNavbarDarkStyle = true; 
  const pokemonBlueNavbarColor = "hsl(217, 91%, 60%)"; // For icon color on hover

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn(
            isNavbarDarkStyle && "text-primary border-primary hover:bg-primary",
            "opacity-0 pointer-events-none" 
        )}
        aria-hidden="true" 
      >
        <Sun className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "hover:text-[hsl(217,91%,60%)]")} /> 
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
            isNavbarDarkStyle && "text-primary border-primary hover:bg-primary focus-visible:ring-primary"
          )}
        >
          {resolvedTheme === "light" ? (
            <Sun className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && `group-hover:text-[${pokemonBlueNavbarColor}]`)} />
          ) : (
            <Moon className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && `group-hover:text-[${pokemonBlueNavbarColor}]`)} />
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
