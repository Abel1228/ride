// components/CustomInput.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
}

export default function CustomInput({
  placeholder,
  value,
  setValue,
  secureTextEntry,
  keyboardType,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
  },
  input: {
    color: "#fff",
    fontSize: 16,
  },
});