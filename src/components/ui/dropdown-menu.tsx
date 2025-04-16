import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface DropdownMenuProps {
  options: string[];
  value: string | null;
  onSelect: (option: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
}

export function DropdownMenu({
  options,
  value,
  onSelect,
  placeholder = "Select...",
  disabled = false,
  style,
}: DropdownMenuProps) {
  const [visible, setVisible] = React.useState(false);

  const handleSelect = (option: string) => {
    setVisible(false);
    onSelect(option);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, style, disabled && styles.disabled]}
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Feather
          name={visible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdownBox}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value === item && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                  {value === item && (
                    <Feather
                      name="check"
                      size={18}
                      color="#007aff"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingVertical: 8 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    minHeight: 44,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  placeholder: {
    color: "#888",
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth: 220,
    maxWidth: 320,
    width: "80%",
    maxHeight: Platform.OS === "web" ? 400 : 320,
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 4,
    alignSelf: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: "#f0f6ff",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  selectedOptionText: {
    color: "#007aff",
    fontWeight: "bold",
  },
});
