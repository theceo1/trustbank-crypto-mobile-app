
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 }}
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      accessibilityLabel="Toggle theme" 
    >
      {resolvedTheme === "dark" ? (
        <Feather name="sun" size={20} color="#FFD700" />
      ) : (
        <Feather name="moon" size={20} color="#334155" />
      )}
    </Button>
  );
}
