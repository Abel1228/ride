import useTheme from "@/app/hooks/UseTheme";
import { createHomeStyles } from "@/assets/styles/home.style";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={homeStyles.loadingText}>Loading your app...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner ;