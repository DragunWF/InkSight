import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

import ChatBubble from "./ChatBubble";

interface UserChatBubbleProps {
  children: ReactNode;
}

function UserChatBubble({ children }: UserChatBubbleProps) {
  return (
    <ChatBubble
      isOwnMessage={true}
      bubbleColor={"#1084ff"} // TODO: Change default color
      tailColor={"#1084ff"}
      withTail={true}
      style={styles.chatBubble}
    >
      <Text style={styles.textOwn}>{children}</Text>
    </ChatBubble>
  );
}

const styles = StyleSheet.create({
  chatBubble: {
    padding: 10,
  },
  textOwn: {
    color: "white",
    fontFamily: "quicksand",
  },
});

export default UserChatBubble;
