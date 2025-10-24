import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { mainColors } from "../../constants/colors";

interface UserChatBubbleProps {
  children: ReactNode;
}

/**
 * User Chat Bubble - Displays user messages in the reflection chat
 *
 * Custom implementation without the base ChatBubble to avoid scaling issues.
 * Styled to appear on the right side with the app's primary color scheme.
 *
 * @param children - The message text content to display
 */
function UserChatBubble({ children }: UserChatBubbleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text
          style={styles.text}
          onLayout={(event) => {
            const { height, width } = event.nativeEvent.layout;
            console.log(`👤 User Bubble layout: ${width}x${height}`);
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
    alignItems: "flex-end",
    marginVertical: 4,
  },
  bubble: {
    backgroundColor: mainColors.primary500,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: "80%",
    minWidth: 60,
    shadowColor: mainColors.primary500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    color: mainColors.textOnPrimary,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default UserChatBubble;
