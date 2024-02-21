import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from "react-native";
import Icon from "../components/Icon/Icon";

// Screens
import HomeScreenEmpty from "../screens/HomeScreen/HomeScreenEmpty";
import TestScreen from "../screens/TestScreen/TestScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreenEmpty}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Home24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Beaker24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
