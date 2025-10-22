import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Button from "../components/ui/Button";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import { mainColors } from "../constants/colors";
import { screenNames } from "../constants/navigation";

interface TakePhotoScreenProps {
  navigation: StackNavigationProp<any>;
}

/**
 * Screen for capturing or selecting journal entry images
 * Allows users to take a photo or select from gallery, then preview before processing
 * Integrates with OCR service to extract text from handwritten journal entries
 */
function TakePhotoScreen({ navigation }: TakePhotoScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Requests camera permissions and launches the camera
   * Allows user to take a photo of their handwritten journal
   */
  const handleTakePhoto = async () => {
    try {
      // Request camera permissions
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Camera access is needed to take photos of your journal entries.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Good balance between quality and file size
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Camera Error", "Failed to take photo. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  /**
   * Requests media library permissions and launches image picker
   * Allows user to select an existing photo from their gallery
   */
  const handleSelectFromGallery = async () => {
    try {
      // Request media library permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Photo library access is needed to select images of your journal entries.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        allowsMultipleSelection: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting from gallery:", error);
      Alert.alert(
        "Gallery Error",
        "Failed to select image. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  /**
   * Processes the selected image through OCR and navigates to insights screen
   * Workflow: Image → OCR → Text Correction → Insights Generation
   */
  const handleProcessImage = () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }

    // Navigate to processing screen with the image URI
    navigation.navigate(screenNames.insightsScreen, {
      imageUri: selectedImage,
      isOcrMode: true,
    });
  };

  /**
   * Clears the selected image and resets the screen
   */
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
            disabled={isProcessing}
          >
            Process Image
          </Button>
          <Button
            onPress={handleClearImage}
            icon="close-circle"
            variant="outline"
            fullWidth
            disabled={isProcessing}
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
