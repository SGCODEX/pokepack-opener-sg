
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context"; // Import and call unconditionally

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggleButton() {
  const [mounted, setMounted] = React.useState(false);
  // Call useTheme unconditionally at the top level
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null after all hooks have been called if not mounted.
    // This helps prevent rendering anything until client-side hydration is complete
    // and theme can be safely determined.
    return null;
  }

  // Logic using theme, only runs if mounted
  const isNavbarDarkStyle = true; // Navbar is always dark styled (blue)
  const CurrentIconToRender = resolvedTheme === "light" ? Sun : Moon;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className={cn(
        // When on the dark navbar, ensure border and text are white, hover changes background
        isNavbarDarkStyle && "border-white hover:bg-[hsl(217,91%,50%)] focus-visible:ring-white text-white"
      )}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <CurrentIconToRender className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
