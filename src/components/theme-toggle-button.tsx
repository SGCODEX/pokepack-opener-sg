
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggleButton() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Hooks and theme-dependent logic are now called only after mounting
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { resolvedTheme, setTheme } = useTheme();

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
