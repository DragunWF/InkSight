import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mainColors, utilityColors } from "../../constants/colors";
import Button from "./Button";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Reusable error display component with retry option
 * @param message - Error message to display
 * @param onRetry - Optional function to call when retry button is pressed
 */
function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={64}
          color={utilityColors.error500}
        />
      </View>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Button onPress={onRetry} icon="refresh" variant="primary">
            Try Again
          </Button>
        </View>
      )}
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: mainColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
});

export default ErrorDisplay;
