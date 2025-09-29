// screens/LoginScreen.tsx
import { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/CustomButton";
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  // states to hold email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLoginPress = () => {
    // placeholder for login action
    console.log("Logging in with:", email, password);
    router.replace('/(home)/details');
  };

  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image
        source={require("../../assets/images/favicon.png")} // put a logo image inside assets
        style={styles.logo}
        resizeMode="center"
      />

      <Text style={styles.title}>Welcome to Ride</Text>

      {/* Input fields */}
      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      {/* Login button */}
      <CustomButton text="Login" onPress={onLoginPress} />

      {/* Extra info */}
      <Text style={styles.footerText}>Don’t have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // dark theme
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  footerText: {
    color: "#aaa",
    marginTop: 20,
  },
});
