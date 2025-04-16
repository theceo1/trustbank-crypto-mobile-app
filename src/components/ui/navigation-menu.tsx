import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface NavigationMenuProps {
  items: NavigationMenuItemProps[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  style?: any;
}

interface NavigationMenuItemProps {
  label: string;
  onPress?: () => void;
  submenu?: NavigationMenuSubItemProps[];
  icon?: React.ReactNode;
}

interface NavigationMenuSubItemProps {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export function NavigationMenu({ items, activeIndex, onSelect, style }: NavigationMenuProps) {
  return (
    <View style={[styles.menuContainer, style]}>
      {items.map((item, idx) => (
        <NavigationMenuItem
          key={item.label + idx}
          {...item}
          active={activeIndex === idx}
          onPress={() => {
            item.onPress && item.onPress();
            onSelect && onSelect(idx);
          }}
        />
      ))}
    </View>
  );
}

function NavigationMenuItem({ label, onPress, submenu, active, icon }: NavigationMenuItemProps & { active?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const hasSubmenu = !!submenu && submenu.length > 0;

  const handlePress = () => {
    if (hasSubmenu) {
      setOpen((o) => !o);
    } else {
      onPress && onPress();
    }
  };

  return (
    <View style={styles.menuItemWrapper}>
      <TouchableOpacity
        style={[styles.menuItem, active && styles.menuItemActive]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text style={[styles.menuItemText, active && styles.menuItemTextActive]}>{label}</Text>
        {hasSubmenu && (
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color={active ? "#007aff" : "#888"}
            style={{ marginLeft: 4 }}
          />
        )}
      </TouchableOpacity>
      {hasSubmenu && (
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableOpacity style={styles.submenuOverlay} onPress={() => setOpen(false)}>
            <View style={styles.submenuBox}>
              {submenu!.map((sub, subIdx) => (
                <TouchableOpacity
                  key={sub.label + subIdx}
                  style={styles.submenuItem}
                  onPress={() => {
                    setOpen(false);
                    sub.onPress && sub.onPress();
                  }}
                  activeOpacity={0.7}
                >
                  {sub.icon && <View style={{ marginRight: 8 }}>{sub.icon}</View>}
                  <Text style={styles.submenuItemText}>{sub.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 2,
  },
  menuItemWrapper: {
    marginHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuItemActive: {
    backgroundColor: "#e8f0fe",
    borderColor: "#007aff",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  menuItemTextActive: {
    color: "#007aff",
    fontWeight: "bold",
  },
  submenuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
    justifyContent: "center",
    alignItems: "center",
  },
  submenuBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth: 180,
    maxWidth: 260,
    width: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 5,
    alignSelf: "center",
    paddingVertical: 8,
  },
  submenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  submenuItemText: {
    fontSize: 15,
    color: "#222",
  },
});
