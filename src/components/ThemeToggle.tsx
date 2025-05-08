
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-20 rounded-full bg-gradient-to-r from-viral-purple to-viral-blue p-1 transition-colors duration-300",
        className
      )}
      aria-label="Toggle theme"
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md transform transition-transform duration-300",
          theme === "dark" ? "translate-x-10" : ""
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-viral-purple" />
        ) : (
          <Sun className="h-4 w-4 text-viral-orange" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
