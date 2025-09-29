// screens/SignupScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/CustomButton";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSignupPress = () => {
    // placeholder for signup action
    console.log("Signing up with:", { name, email, phone, password });
  };

  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create your account</Text>

      {/* Input fields */}
      <CustomInput placeholder="Full Name" value={name} setValue={setName} />
      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Phone Number"
        value={phone}
        setValue={setPhone}
        keyboardType="phone-pad"
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      {/* Signup button */}
      <CustomButton text="Sign Up" onPress={onSignupPress} />

      {/* Footer text */}
      <Text style={styles.footerText}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  footerText: {
    color: "#aaa",
    marginTop: 20,
  },
});