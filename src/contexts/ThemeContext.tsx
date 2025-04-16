
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // React Native: use Appearance API for system theme
  React.useEffect(() => {
    if (theme === "system") {
      const colorScheme = Appearance.getColorScheme();
      setResolvedTheme(colorScheme === "dark" ? "dark" : "light");
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setResolvedTheme(colorScheme === "dark" ? "dark" : "light");
      });
      return () => listener.remove();
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
