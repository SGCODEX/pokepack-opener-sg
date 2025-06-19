
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  // Determine if the navbar context is dark (our blue navbar is dark)
  const isNavbarDarkStyle = true; 

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn(
            isNavbarDarkStyle && "text-primary border-white hover:bg-[hsl(217,91%,50%)] focus-visible:ring-white", 
            "opacity-0 pointer-events-none" 
        )}
        aria-hidden="true" 
      >
        <Sun className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} /> 
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "group", 
        isNavbarDarkStyle && "text-primary border-white hover:bg-[hsl(217,91%,50%)] focus-visible:ring-white"
      )}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {resolvedTheme === "light" ? (
        <Sun className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} />
      ) : (
        <Moon className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

