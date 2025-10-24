import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import JournalNavigator from "./JournalNavigator";
import InsightsNavigator from "./InsightsNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import { navigatorNames } from "../../constants/navigation";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";

const BottomTab = createBottomTabNavigator();

/**
 * Main app navigator with bottom tab navigation
 * Features three main sections: Journal, Insights, and Chat
 */
function AppNavigator() {
  return (
    <BottomTab.Navigator
      id={navigatorNames.appNavigator as any}
      initialRouteName={navigatorNames.insightsNavigator}
      screenOptions={{
        tabBarActiveTintColor: mainColors.primary500,
        tabBarInactiveTintColor: mainColors.textMuted,
        tabBarStyle: {
          backgroundColor: mainColors.backgroundAlt,
          borderTopWidth: 1,
          borderTopColor: mainColors.borderLight,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: mainColors.backgroundAlt,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: mainColors.borderLight,
        },
        headerTintColor: mainColors.primary500,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <BottomTab.Screen
        name={navigatorNames.journalNavigator}
        component={JournalNavigator}
        options={{
          headerShown: false,
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
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default AppNavigator;
