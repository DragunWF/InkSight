import { StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Reusable Button component with multiple variants
 * @param onPress - Function to call when button is pressed
 * @param children - Button text label
 * @param variant - Visual style: 'primary' (default), 'secondary', or 'outline'
 * @param icon - Optional Ionicons icon name to display before text
 * @param disabled - Whether button is disabled
 * @param fullWidth - Whether button should take full width of container
 */
function Button({
  onPress,
  children,
  variant = "primary",
  icon,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton;
      case "outline":
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        pressed && styles.pressed,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={
              variant === "outline"
                ? mainColors.primary500
                : mainColors.textOnPrimary
            }
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, getTextStyle()]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: mainColors.primary500,
  },
  secondaryButton: {
    backgroundColor: mainColors.accent500,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: mainColors.primary500,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: mainColors.textOnPrimary,
  },
  secondaryText: {
    color: mainColors.textPrimary,
  },
  outlineText: {
    color: mainColors.primary500,
  },
  icon: {
    marginRight: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
});

export default Button;
