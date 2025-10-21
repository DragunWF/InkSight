import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/ui/Button";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import { mainColors } from "../constants/colors";

/**
 * Screen for capturing or selecting journal entry images
 * Allows users to take a photo or select from gallery, then preview before processing
 */
function TakePhotoScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder functions - implement with expo-image-picker or react-native-camera
  const handleTakePhoto = () => {
    Alert.alert(
      "Camera",
      "Camera functionality will be implemented with expo-image-picker"
    );
    // TODO: Implement camera functionality
    // Example: const result = await ImagePicker.launchCameraAsync({...});
  };

  const handleSelectFromGallery = () => {
    Alert.alert(
      "Gallery",
      "Gallery selection will be implemented with expo-image-picker"
    );
    // TODO: Implement gallery selection
    // Example: const result = await ImagePicker.launchImageLibraryAsync({...});
  };

  const handleProcessImage = () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }
    Alert.alert(
      "Processing",
      "This will process the image with OCR and generate insights"
    );
    // TODO: Navigate to processing/results screen
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="camera-outline"
          size={48}
          color={mainColors.primary500}
        />
        <Text style={styles.title}>Capture Your Journal</Text>
        <Text style={styles.subtitle}>
          Take a photo or select an existing image of your handwritten journal
          entry
        </Text>
      </View>

      {/* Image Preview */}
      <View style={styles.imageSection}>
        <ImagePlaceholder imageUri={selectedImage} />
      </View>

      {/* Action Buttons */}
      {!selectedImage ? (
        <View style={styles.actionContainer}>
          <Button
            onPress={handleTakePhoto}
            icon="camera"
            variant="primary"
            fullWidth
          >
            Take Photo
          </Button>
          <Button
            onPress={handleSelectFromGallery}
            icon="images"
            variant="outline"
            fullWidth
          >
            Choose from Gallery
          </Button>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <Button
            onPress={handleProcessImage}
            icon="scan"
            variant="primary"
            fullWidth
          >
            Process Image
          </Button>
          <Button
            onPress={handleClearImage}
            icon="close-circle"
            variant="outline"
            fullWidth
          >
            Clear Selection
          </Button>
        </View>
      )}

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
        <View style={styles.tipItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={mainColors.primary500}
          />
          <Text style={styles.tipText}>
            Ensure good lighting for better text recognition
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={mainColors.primary500}
          />
          <Text style={styles.tipText}>
            Capture text straight-on to avoid distortion
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={mainColors.primary500}
          />
          <Text style={styles.tipText}>
            Make sure handwriting is clear and legible
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: mainColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  imageSection: {
    marginBottom: 24,
  },
  actionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  tipsContainer: {
    backgroundColor: mainColors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.primary500,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: mainColors.textSecondary,
    lineHeight: 20,
  },
});

export default TakePhotoScreen;
