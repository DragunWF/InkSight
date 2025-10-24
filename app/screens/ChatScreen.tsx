import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

import AIChatBubble from "../components/chat/AIChatBubble";
import UserChatBubble from "../components/chat/UserChatBubble";
import { mainColors } from "../constants/colors";
import { generateReflectionResponse } from "../helpers/ai/insightsGenerator";

/**
 * Interface for a single message in the chat
 */
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * Navigation parameters for the chat screen
 */
interface ChatScreenParams {
  journalEntry: string;
  insights?: string;
  entryId?: number;
}

interface ChatScreenProps {
  route: { params: ChatScreenParams };
  navigation: StackNavigationProp<any>;
}

/**
 * Reflection Chat Screen - Enables deep conversation about journal entries
 *
 * This screen creates a safe space for users to explore their thoughts and feelings
 * through AI-powered dialogue. The chatbot has context of the journal entry and
 * generated insights, allowing for meaningful, contextual conversations.
 *
 * Features:
 * - Context-aware responses based on journal entry and insights
 * - Real-time message streaming
 * - Smooth keyboard handling
 * - Auto-scroll to latest messages
 * - Welcome message with conversation starters
 *
 * @param route - Contains journalEntry (required), insights (optional), entryId (optional)
 * @param navigation - Stack navigation for going back
 */
function ChatScreen({ route, navigation }: ChatScreenProps) {
  const { journalEntry, insights, entryId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  /**
   * Initializes the chat with a welcome message on mount
   */
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: "Hello! I'm here to help you reflect on your journal entry. Feel free to share your thoughts, ask questions, or explore your feelings. What would you like to talk about?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    console.log("📱 Chat initialized with welcome message");
  }, []);

  /**
   * Auto-scrolls to the bottom when new messages arrive
   */
  useEffect(() => {
    if (messages.length > 0) {
      console.log(`📱 Messages updated, count: ${messages.length}`);
      setTimeout(() => {
        console.log("📱 Attempting to scroll to end");
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [messages]);

  /**
   * Sends a user message and gets AI response
   */
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Generate AI response with full context
      const response = await generateReflectionResponse(
        journalEntry,
        inputText.trim()
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating reflection response:", error);
      Alert.alert(
        "Error",
        "Failed to generate response. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Renders a single message (user or AI)
   */
  const renderMessage = ({ item }: { item: Message }) => {
    if (item.isUser) {
      return (
        <View style={styles.messageContainer}>
          <UserChatBubble>{item.text}</UserChatBubble>
        </View>
      );
    } else {
      return (
        <View style={styles.messageContainer}>
          <AIChatBubble>{item.text}</AIChatBubble>
        </View>
      );
    }
  };

  /**
   * Renders the header with context info
   */
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.contextCard}>
        <View style={styles.contextHeader}>
          <Ionicons name="book" size={16} color={mainColors.primary500} />
          <Text style={styles.contextTitle}>Reflecting on your entry</Text>
        </View>
        <Text style={styles.contextPreview} numberOfLines={3}>
          {journalEntry}
        </Text>
      </View>
    </View>
  );

  /**
   * Renders typing indicator when AI is thinking
   */
  const renderTypingIndicator = () => (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <ActivityIndicator size="small" color={mainColors.primary500} />
        <Text style={styles.typingText}>InkSight is thinking...</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={isLoading ? renderTypingIndicator : null}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={(width, height) => {
          console.log(`📱 Content size changed: ${width}x${height}`);
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }}
        onLayout={() => {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }, 100);
        }}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Share your thoughts..."
            placeholderTextColor={mainColors.textMuted}
            multiline
            maxLength={1000}
            editable={!isLoading}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons
              name="send"
              size={20}
              color={
                !inputText.trim() || isLoading
                  ? mainColors.textMuted
                  : mainColors.textOnPrimary
              }
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 8,
  },
  headerContainer: {
    marginBottom: 20,
  },
  contextCard: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: mainColors.accent500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contextHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  contextTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: mainColors.primary700,
  },
  contextPreview: {
    fontSize: 13,
    color: mainColors.textSecondary,
    lineHeight: 18,
    fontStyle: "italic",
  },
  typingContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: mainColors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  typingText: {
    fontSize: 14,
    color: mainColors.textSecondary,
    fontStyle: "italic",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: mainColors.borderLight,
    backgroundColor: mainColors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: mainColors.background,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    color: mainColors.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: mainColors.primary500,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: mainColors.primary500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: mainColors.borderLight,
    shadowOpacity: 0,
  },
});

export default ChatScreen;
