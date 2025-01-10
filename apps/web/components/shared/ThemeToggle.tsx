"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@workspace/ui/components/switch";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex w-full items-center justify-between">
      <p>Theme</p>
      <div className="relative inline-grid h-6 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          className="data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 peer absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center">
          <Moon size={16} strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center">
          <Sun size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
