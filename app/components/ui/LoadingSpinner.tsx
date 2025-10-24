import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { mainColors } from "../../constants/colors";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

/**
 * Reusable loading spinner component with optional message
 * @param message - Optional text to display below the spinner
 * @param size - Size of the spinner: 'small' or 'large' (default: 'large')
 */
function LoadingSpinner({ message, size = "large" }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={mainColors.primary500} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 15,
    color: mainColors.textSecondary,
    textAlign: "center",
  },
});

export default LoadingSpinner;
