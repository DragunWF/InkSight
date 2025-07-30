import { StyleSheet, View, Text } from "react-native";

import Title from "../components/ui/Title";
import PressableCard from "../components/ui/PressableCard";

function InsightsGeneratorScreen() {
  async function takePhotoHandler() {}

  async function pasteTextHandler() {}

  return (
    <View style={styles.rootContainer}>
      <Title>Choose a method</Title>
      <PressableCard
        icon="camera"
        label="Take a photo"
        onPress={takePhotoHandler}
      />
      <PressableCard
        icon="paste"
        label="Paste text from your digital journal"
        onPress={pasteTextHandler}
        iconType="fontawesome5"
      />
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          dolores quibusdam consequatur. Hic minus adipisci error, dolores
          placeat numquam harum?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
  },
  instructionsContainer: {
    margin: 10,
  },
  instructionsText: {
    textAlign: "justify",
  },
});

export default InsightsGeneratorScreen;
