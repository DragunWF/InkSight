import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

import ChatBubble from "./ChatBubble";

interface AIChatBubbleProps {
  children: ReactNode;
}

function AIChatBubble({ children }: AIChatBubbleProps) {
  return (
    <ChatBubble
      isOwnMessage={false}
      bubbleColor={"gray"} // TODO: Change default color
      withTail={true}
      style={styles.chatBubble}
    >
      <Text style={styles.text}>{children}</Text>
    </ChatBubble>
  );
}

const styles = StyleSheet.create({
  chatBubble: {
    padding: 10,
  },
  text: {
    color: "black",
    fontFamily: "quicksand",
  },
});

export default AIChatBubble;
