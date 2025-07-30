import { ReactNode } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";

interface PressableCardProps {
  label: string;
  icon: string;
  onPress: () => void;
  iconType?: string;
  color?: string;
  size?: number;
}

function PressableCard({
  label,
  icon,
  onPress,
  iconType = "ionicons",
  color = "black",
  size = 24,
}: PressableCardProps) {
  let iconComponent: ReactNode;
  switch (iconType.toLowerCase()) {
    case "fontawesome5":
      iconComponent = (
        <FontAwesome5 name={icon as any} size={size} color={color} />
      );
      break;
    case "entopy":
      iconComponent = <Entypo name={icon as any} size={size} color={color} />;
      break;
    default:
      iconComponent = <Ionicons name={icon as any} size={size} color={color} />;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.card}>
        {iconComponent}
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    minHeight: 150,
    marginHorizontal: 40,
    marginVertical: 10,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default PressableCard;
