import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { mainColors } from "../../constants/colors";

interface AIChatBubbleProps {
  children: ReactNode;
}

/**
 * AI Chat Bubble - Displays AI responses in the reflection chat
 *
 * Custom implementation without the base ChatBubble to avoid scaling issues.
 * Styled to appear on the left side with a clean, professional appearance.
 *
 * @param children - The AI-generated message text to display
 */
function AIChatBubble({ children }: AIChatBubbleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text
          style={styles.text}
          onLayout={(event) => {
            const { height, width } = event.nativeEvent.layout;
            console.log(`🤖 AI Bubble layout: ${width}x${height}`);
          }}
        >
          {children}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginVertical: 4,
  },
  bubble: {
    backgroundColor: mainColors.backgroundAlt,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: "80%",
    minWidth: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  text: {
    color: mainColors.textPrimary,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default AIChatBubble;
