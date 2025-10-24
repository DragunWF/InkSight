import { StyleSheet, View, Text, ScrollView } from "react-native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import PressableCard from "../components/ui/PressableCard";
import { screenNames } from "../constants/navigation";
import { mainColors } from "../constants/colors";

interface InsightsGeneratorScreenProps {
  navigation: BottomTabNavigationProp<any>;
}

function InsightsGeneratorScreen({ navigation }: InsightsGeneratorScreenProps) {
  function takePhotoHandler() {
    navigation.navigate(screenNames.takePhotoScreen);
  }

  function pasteTextHandler() {
    navigation.navigate(screenNames.pasteJournalScreen);
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.rootContainer}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Title>Generate Insights</Title>
        <Text style={styles.subtitle}>
          Transform your journal entries into meaningful reflections
        </Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardsContainer}>
        <PressableCard
          icon="camera"
          label="Scan Physical Journal"
          description="Take a photo or select from your gallery"
          onPress={takePhotoHandler}
          color={mainColors.primary500}
          size={28}
        />
        <PressableCard
          icon="paste"
          label="Paste Digital Entry"
          description="Copy and paste from your digital journal"
          onPress={pasteTextHandler}
          iconType="fontawesome5"
          color={mainColors.primary500}
          size={28}
        />
      </View>

      {/* Instructions Section */}
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionsHeader}>
          <Ionicons
            name="information-circle"
            size={20}
            color={mainColors.primary500}
          />
          <Text style={styles.instructionsTitle}>How it works</Text>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose your method</Text>
            <Text style={styles.stepDescription}>
              Scan a handwritten entry or paste your digital journal text
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>AI processes your entry</Text>
            <Text style={styles.stepDescription}>
              Our AI refines and analyzes your thoughts while preserving your
              authentic voice
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Receive insights</Text>
            <Text style={styles.stepDescription}>
              Get personalized feedback, tone analysis, and reflective prompts
              to support your growth
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Stats or Tips Section (Optional Enhancement) */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
        <Text style={styles.tipText}>
          • Write freely without worrying about grammar or structure
        </Text>
        <Text style={styles.tipText}>
          • Include specific emotions and experiences for richer insights
        </Text>
        <Text style={styles.tipText}>
          • Review insights regularly to track your personal growth
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  rootContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    color: mainColors.textSecondary,
    textAlign: "center",
    marginTop: 5,
    lineHeight: 20,
  },
  cardsContainer: {
    marginBottom: 30,
  },
  instructionsContainer: {
    backgroundColor: mainColors.backgroundAlt,
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginLeft: 8,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: mainColors.primary500,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: mainColors.textOnPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: mainColors.textSecondary,
    lineHeight: 18,
  },
  tipsContainer: {
    backgroundColor: mainColors.accent100,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.accent500,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    color: mainColors.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
});

export default InsightsGeneratorScreen;
