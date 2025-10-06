// screens/SignupScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/customInput";

export default function SignupOTP() {
  // const [Firstname, setFirstName] = useState("");
  // const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const router = useRouter();

  const onSignupPress = () => {
    // placeholder for signup action
    console.log("Signing up 1st...:", { 
      // name: Firstname, 
      // email: LastName, 
      phone, 
      password: OTP });
      router.replace('/(auth)/signup_OTP2')
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

        <Text style={styles.title}>Welcome to Ride</Text>
        <Text style={styles.footerText}>Enter your mobile number to sign In</Text>

        {/* Input fields */}
        
        {/* <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}> */}
        <CustomInput
          placeholder="Phone Number"
          value={phone}
          setValue={setPhone}
          keyboardType="phone-pad"
        />
        <CustomButton text="Next" onPress={onSignupPress} />
        {/* </View> */}

        {/* <CustomInput
          placeholder=""
          value={OTP}
          setValue={setOTP}
          secureTextEntry
        />

        <CustomButton text="Next" onPress={onSignupPress} /> */}

        {/* Footer text */}
        <Text
          style={styles.footerText}
          onPress={() => router.replace('/login')}
        >
          Already have an account? Login
        </Text>
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