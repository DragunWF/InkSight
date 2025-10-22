import { createStackNavigator } from "@react-navigation/stack";

import JournalEntriesScreen from "../../screens/JournalEntriesScreen";
import JournalScreen from "../../screens/JournalScreen";
import { screenNames, navigatorNames } from "../../constants/navigation";

const Stack = createStackNavigator();

/**
 * Stack navigator for journal-related screens
 * Handles navigation between journal entries list and individual entry details
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
    </Stack.Navigator>
  );
}

export default JournalNavigator;
