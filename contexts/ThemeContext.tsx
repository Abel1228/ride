import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === "dark");

  // ✅ Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (e) {
        console.log("Error loading theme:", e);
      }
    };
    loadTheme();
  }, []);

  // ✅ Toggle and save theme
  const toggleTheme = async () => {
    try {
      const newTheme = isDark ? "light" : "dark";
      setIsDark(!isDark);
      await AsyncStorage.setItem("theme", newTheme);
    } catch (e) {
      console.log("Error saving theme:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
