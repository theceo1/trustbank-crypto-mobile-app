//src/components/ThemeToggle.tsx
import { useTheme } from "@/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ThemeToggle = () => {
  const { theme, setThemeName } = useTheme();
  const isDark = theme.colors.background === '#101522';

  return (
    <TouchableOpacity
      onPress={() => setThemeName(isDark ? 'light' : 'dark')}
      style={{ padding: 6 }}
      accessibilityLabel="Toggle theme"
    >
      {theme.colors.background === '#101522' ? (
        <Feather name="sun" size={20} color="#FFD700" />
      ) : (
        <Feather name="moon" size={20} color="#334155" />
      )}
    </TouchableOpacity>
  );
}
