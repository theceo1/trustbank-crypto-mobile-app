//src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";



export type ThemeName = 'light' | 'dark';
export type Theme = {
  colors: {
    background: string;
    card: string;
    border: string;
    text: string;
    secondaryText: string;
    primary: string;
    // Add any other keys needed by your UI
  };
};

interface ThemeContextType {
  theme: Theme;
  setThemeName: (name: ThemeName) => void;
}

const lightTheme: Theme = {
  colors: {
    background: '#fff',
    card: '#f8fafc',
    border: '#e5e7eb',
    text: '#1a237e',
    secondaryText: '#64748b',
    primary: '#03a9f4',
  }
};

const darkTheme: Theme = {
  colors: {
    background: '#101522',
    card: '#1a1f2e',
    border: '#23263a',
    text: '#f8fafc',
    secondaryText: '#a3a3a3',
    primary: '#03a9f4',
  }
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  setThemeName: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setThemeName }}>
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
