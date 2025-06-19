
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

  const isNavbarDarkStyle = true; // Navbar is always dark styled (blue)

  if (!mounted) {
    // Determine which icon to render based on the initial theme (defaultTheme from server/first client render)
    // This ensures the server-rendered hidden button matches the client's first pass.
    const InitialIconToRender = resolvedTheme === "light" ? Sun : Moon;
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn(
            isNavbarDarkStyle && "border-white hover:bg-[hsl(217,91%,50%)] focus-visible:ring-white",
            "opacity-0 pointer-events-none" // Hide it visually but structure should match
        )}
        aria-hidden="true"
        tabIndex={-1} // Make it unfocusable when hidden
      >
        <InitialIconToRender className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} />
      </Button>
    );
  }

  // Once mounted, render the actual interactive button
  const CurrentIconToRender = resolvedTheme === "light" ? Sun : Moon;
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "group", // group class is not strictly needed for icon color anymore but kept for consistency
        isNavbarDarkStyle && "border-white hover:bg-[hsl(217,91%,50%)] focus-visible:ring-white"
      )}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <CurrentIconToRender className={cn("h-[1.2rem] w-[1.2rem]", isNavbarDarkStyle && "text-white")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
