// screens/SignupScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/customInput";

export default function SignupScreen() {
  const [Firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [OTP, setOTP] = useState("");
  const router = useRouter();

  const onSignupPress = () => {
    router.replace('/(home)')
    // placeholder for signup action
    console.log("Signing up...:", { 
      name: Firstname, 
      email: LastName, 
      // phone, 
      // password: OTP 
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        {/* App logo */}
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create your account</Text>

        {/* Input fields */}
        <CustomInput placeholder="First Name" value={Firstname} setValue={setFirstName} />
        <CustomInput
          placeholder="Last Name"
          value={LastName}
          setValue={setLastName}
        />
        {/* <CustomInput
          placeholder="Phone Number"
          value={phone}
          setValue={setPhone}
          keyboardType="phone-pad"
        />
        <CustomInput
          placeholder="Password"
          value={OTP}
          setValue={setOTP}
          secureTextEntry
        /> */}

        <CustomButton text="Sign Up" onPress={onSignupPress} />
        {/* <Text
          style={styles.footerText}
          onPress={() => router.replace('/(tabs)/Login')}
        >
          Already have an account? Login
        </Text> */}
      </View>
    </SafeAreaView>
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