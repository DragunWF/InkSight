import { StyleSheet, View, Text, TextInput } from "react-native";

function PasteJournalScreen() {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Paste your journal entry here" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
  },
});

export default PasteJournalScreen;
