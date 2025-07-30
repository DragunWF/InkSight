import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import JournalEntriesScreen from "../../screens/JournalEntriesScreen";
import ChatScreen from "../../screens/ChatScreen";
import InsightsNavigator from "./InsightsNavigator";
import { navigatorNames, screenNames } from "../../constants/navigation";
import { FontAwesome, FontAwesome6, Entypo } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <BottomTab.Navigator
      id={navigatorNames.appNavigator as any}
      initialRouteName={navigatorNames.insightsNavigator}
    >
      <BottomTab.Screen
        name={screenNames.journalEntries}
        component={JournalEntriesScreen}
        options={{
          headerTitle: "Insights Generator",
          tabBarLabel: "Journal",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={navigatorNames.insightsNavigator}
        component={InsightsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Insights",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="brain" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={screenNames.chat}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default AppNavigator;
