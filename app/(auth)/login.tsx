// screens/LoginScreen.tsx
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, StyleSheet, Text, View, Switch } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/customInput";
import { useTheme } from "../../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function loginScreen() {
  // states to hold email and password values
  const [phoneNo, setphoneNo] = useState("");
  const [password, setPassword] = useState("");
  const { isDark, toggleTheme } = useTheme(); // 👈 access dark mode state
  const router = useRouter();

  const onLoginPress = () => {
    // placeholder for login action
    console.log("Logging in with:", phoneNo, password);
    router.replace('/(home)');
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? "#000" : "#fff" }, // dynamic background
      ]}>
          {/* Theme toggle */}
      <View style={{top: 20 , position: 'absolute', right: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{ color: isDark ? "#fff" : "#000", marginRight: 8 }}>
          {isDark ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      {/* ✅ Fix white status bar icons */}
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* App logo */}
      <Image
        source={require("../../assets/images/favicon.png")} // put a logo image inside assets
        style={styles.logo}
        resizeMode="center"
      />

      <Text style={styles.title}>Welcome to Ride</Text>

      {/* Input fields */}
      <CustomInput
        placeholder="Phone Number"
        value={phoneNo}
        setValue={setphoneNo}
        keyboardType="phone-pad"
      />
      {/* <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      /> */}

      {/* Login button */}
      <CustomButton text="Next" onPress={onLoginPress} />

      {/* Extra info */}
      <Text
        style={styles.footerText}
        onPress={() => router.replace('../(auth)/signup_OTP')}
      >
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000", // dark theme
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
    // color: "#fff",
    marginBottom: 20,
  },
   toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
   },
  footerText: {
    color: "#aaa",
    marginTop: 20,
  },
});
