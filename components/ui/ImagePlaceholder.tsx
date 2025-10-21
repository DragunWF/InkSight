import { StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";

interface ImagePlaceholderProps {
  imageUri?: string | null;
  aspectRatio?: number;
}

/**
 * Reusable image placeholder component
 * Shows either the selected image or a placeholder with an icon
 * @param imageUri - URI of the selected image (optional)
 * @param aspectRatio - Aspect ratio of the image container (default: 4/3)
 */
function ImagePlaceholder({
  imageUri,
  aspectRatio = 4 / 3,
}: ImagePlaceholderProps) {
  return (
    <View style={[styles.container, { aspectRatio }]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="image-outline"
            size={64}
            color={mainColors.textMuted}
          />
          <Text style={styles.placeholderText}>No image selected</Text>
          <Text style={styles.placeholderSubtext}>
            Take a photo or choose from gallery
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: mainColors.background,
    borderWidth: 2,
    borderColor: mainColors.borderLight,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textSecondary,
    marginTop: 12,
  },
  placeholderSubtext: {
    fontSize: 13,
    color: mainColors.textMuted,
    marginTop: 4,
    textAlign: "center",
  },
});

export default ImagePlaceholder;
