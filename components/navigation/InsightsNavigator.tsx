import { createStackNavigator } from "@react-navigation/stack";

import InsightsGeneratorScreen from "../../screens/InsightsGeneratorScreen";
import PasteJournalScreen from "../../screens/PasteJournalScreen";
import TakePhotoScreen from "../../screens/TakePhotoScreen";
import InsightsScreen from "../../screens/InsightsScreen";
import ChatScreen from "../../screens/ChatScreen";
import { screenNames, navigatorNames } from "../../constants/navigation";

const Stack = createStackNavigator();

/**
 * Stack navigator for insights generation flow
 * Handles the complete workflow: select input method → process → view insights → chat
 */
function InsightsNavigator() {
  return (
    <Stack.Navigator id={navigatorNames.insightsNavigator as any}>
      <Stack.Screen
        name={screenNames.insightsGenerator}
        component={InsightsGeneratorScreen}
        options={{
          headerTitle: "Insights Generator",
        }}
      />
      <Stack.Screen
        name={screenNames.takePhotoScreen}
        component={TakePhotoScreen}
        options={{
          headerTitle: "Take Photo of your Journal",
        }}
      />
      <Stack.Screen
        name={screenNames.pasteJournalScreen}
        component={PasteJournalScreen}
        options={{
          headerTitle: "Paste Journal Text",
        }}
      />
      <Stack.Screen
        name={screenNames.insightsScreen}
        component={InsightsScreen}
        options={{
          headerTitle: "Insights",
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

export default InsightsNavigator;
