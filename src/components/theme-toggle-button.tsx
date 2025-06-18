
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react"; // Monitor icon removed
import { useTheme } from "@/contexts/theme-context";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme(); // theme can be used directly

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Use resolvedTheme or theme for icon display, they should be consistent now */}
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
        {/* System theme option removed */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

