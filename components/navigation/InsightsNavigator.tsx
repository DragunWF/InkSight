import { createStackNavigator } from "@react-navigation/stack";

import InsightsGeneratorScreen from "../../screens/InsightsGeneratorScreen";
import PasteJournalScreen from "../../screens/PasteJournalScreen";
import TakePhotoScreen from "../../screens/TakePhotoScreen";
import { screenNames, navigatorNames } from "../../constants/navigation";
import InsightsScreen from "../../screens/InsightsScreen";

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
}

export default InsightsNavigator;
