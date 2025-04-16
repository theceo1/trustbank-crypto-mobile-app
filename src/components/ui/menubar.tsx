import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";

export interface MenubarItem {
  label: string;
  onPress?: () => void;
  submenu?: MenubarItem[];
  checked?: boolean;
  radioValue?: string;
  shortcut?: string;
  icon?: React.ReactNode;
}

export interface MenubarProps {
  items: MenubarItem[];
  style?: any;
}

export function Menubar({ items, style }: MenubarProps) {
  return (
    <View style={[styles.menuBar, style]}>
      {items.map((item, idx) => (
        <MenubarButton key={item.label + idx} item={item} />
      ))}
    </View>
  );
}

function MenubarButton({ item }: { item: MenubarItem }) {
  const [open, setOpen] = React.useState(false);
  const hasSubmenu = !!item.submenu && item.submenu.length > 0;

  const handlePress = () => {
    if (hasSubmenu) setOpen((o) => !o);
    else item.onPress && item.onPress();
  };

  return (
    <View style={styles.menuBtnWrapper}>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {item.icon && <View style={{ marginRight: 6 }}>{item.icon}</View>}
        <Text style={styles.menuBtnText}>{item.label}</Text>
        {hasSubmenu && (
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={16}
            color="#888"
            style={{ marginLeft: 4 }}
          />
        )}
        {typeof item.checked === "boolean" && (
          <Feather
            name={item.checked ? "check" : "circle"}
            size={16}
            color={item.checked ? "#007aff" : "#ccc"}
            style={{ marginLeft: 4 }}
          />
        )}
        {item.shortcut && (
          <Text style={styles.shortcutText}>{item.shortcut}</Text>
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
              {item.submenu!.map((sub, subIdx) => (
                <TouchableOpacity
                  key={sub.label + subIdx}
                  style={styles.submenuItem}
                  onPress={() => {
                    setOpen(false);
                    sub.onPress && sub.onPress();
                  }}
                  activeOpacity={0.7}
                >
                  {sub.icon && <View style={{ marginRight: 6 }}>{sub.icon}</View>}
                  <Text style={styles.menuBtnText}>{sub.label}</Text>
                  {typeof sub.checked === "boolean" && (
                    <Feather
                      name={sub.checked ? "check" : "circle"}
                      size={16}
                      color={sub.checked ? "#007aff" : "#ccc"}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                  {sub.shortcut && (
                    <Text style={styles.shortcutText}>{sub.shortcut}</Text>
                  )}
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
  menuBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 2,
  },
  menuBtnWrapper: {
    marginHorizontal: 3,
  },
  menuBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#eee",
    minWidth: 48,
  },
  menuBtnText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  shortcutText: {
    marginLeft: 10,
    color: "#aaa",
    fontSize: 12,
    letterSpacing: 1,
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
});
