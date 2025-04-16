import * as React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export function InputOTP({ length = 6, onChange, value }: { length?: number; onChange?: (val: string) => void; value?: string }) {
  const [otp, setOtp] = React.useState(value || "");
  React.useEffect(() => { if (value !== undefined) setOtp(value); }, [value]);
  const handleChange = (text: string, idx: number) => {
    const arr = otp.split("");
    arr[idx] = text[text.length - 1] || "";
    const newVal = arr.join("").slice(0, length);
    setOtp(newVal);
    onChange && onChange(newVal);
  };
  return (
    <View style={styles.otpRow}>
      {Array.from({ length }).map((_, idx) => (
        <TextInput
          key={idx}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[idx] || ""}
          onChangeText={t => handleChange(t, idx)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  otpInput: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});
