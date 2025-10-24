import { ReactNode } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";

interface PressableCardProps {
  label: string;
  icon: string;
  onPress: () => void;
  iconType?: string;
  color?: string;
  size?: number;
  description?: string;
}

/**
 * Reusable pressable card component with icon and label
 * Features a modern gradient-like design with shadow effects
 * @param label - Main label text displayed on the card
 * @param icon - Icon name (depends on iconType)
 * @param onPress - Function called when card is pressed
 * @param iconType - Icon library to use: 'ionicons', 'fontawesome5', or 'entypo'
 * @param color - Icon color (default: primary500)
 * @param size - Icon size (default: 32)
 * @param description - Optional secondary text below the label
 */
function PressableCard({
  label,
  icon,
  onPress,
  iconType = "ionicons",
  color = mainColors.primary500,
  size = 32,
  description,
}: PressableCardProps) {
  let iconComponent: ReactNode;
  switch (iconType.toLowerCase()) {
    case "fontawesome5":
      iconComponent = (
        <FontAwesome5 name={icon as any} size={size} color={color} />
      );
      break;
    case "entypo":
      iconComponent = <Entypo name={icon as any} size={size} color={color} />;
      break;
    default:
      iconComponent = <Ionicons name={icon as any} size={size} color={color} />;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <View style={styles.iconContainer}>{iconComponent}</View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: mainColors.backgroundAlt,
    minHeight: 100,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
    elevation: 3,
    shadowColor: mainColors.primary500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: mainColors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: mainColors.textSecondary,
    lineHeight: 18,
  },
});

export default PressableCard;
