import { createStackNavigator } from "@react-navigation/stack";

import JournalEntriesScreen from "../../screens/JournalEntriesScreen";
import JournalScreen from "../../screens/JournalScreen";
import ChatScreen from "../../screens/ChatScreen";
import { screenNames, navigatorNames } from "../../constants/navigation";

const Stack = createStackNavigator();

/**
 * Stack navigator for journal-related screens
 * Handles navigation between journal entries list, individual entry details,
 * and the reflection chat screen
 */
function JournalNavigator() {
  return (
    <Stack.Navigator id={navigatorNames.journalNavigator as any}>
      <Stack.Screen
        name={screenNames.journalEntries}
        component={JournalEntriesScreen}
        options={{
          headerShown: false, // Hide header since it's in the tab bar
        }}
      />
      <Stack.Screen
        name={screenNames.journalScreen}
        component={JournalScreen}
        options={{
          headerTitle: "Journal Entry",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name={screenNames.chatScreen}
        component={ChatScreen}
        options={{
          headerTitle: "Reflection Chat",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

export default JournalNavigator;
