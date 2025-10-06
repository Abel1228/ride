import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OtpInputs from "react-native-otp-textinput";

const OtpScreen = ({ navigation, route }: any) => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60); // countdown seconds
  const phoneNumber = route?.params?.phone || "+251 943075112";

  // Countdown effect
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const onVerify = () => {
    router.replace('/(auth)/signup')
    console.log("Entered OTP:", code);
    // TODO: Call API for verification
  };

  const onResend = () => {
    setTimer(60);
    console.log("Resend OTP to:", phoneNumber);
  };

  return (
    <View style={styles.container}>
      {/* Back + Title */}
      <TouchableOpacity onPress={() => router.replace('/(pages)/signup_OTP')} style={styles.backBtn}>
        <Text style={{ fontSize: 20 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Verify Your mobile number</Text>
      <Text style={styles.subtitle}>
        Enter your one time password sent to {"\n"}
        <Text style={{ fontWeight: "600" }}>{phoneNumber}</Text>
      </Text>

      {/* OTP Inputs */}
      <OtpInputs 
        handleTextChange={setCode}
        numberOfLines={4}
        // autofillFromClipboard={false}
        // style={styles.otpContainer}
        // inputStyles={styles.otpInput}
      />

      {/* Resend Section */}
      <Text style={styles.resendText}>
        Didn’t receive SMS?
      </Text>
      {timer > 0 ? (
        <Text style={styles.resendTimer}>
          You can resend code in <Text style={{ color: "green" }}>{timer}</Text> s
        </Text>
      ) : (
        <TouchableOpacity onPress={onResend}>
          <Text style={[styles.resendTimer, { color: "green" }]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      )}

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyBtn} onPress={onVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#f9f9f9",
  },
  resendText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  resendTimer: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
  },
  verifyBtn: {
    marginTop: 40,
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
