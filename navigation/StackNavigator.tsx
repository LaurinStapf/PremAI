// StackNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import TestScreen from "../screens/TestScreen/TestScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";

// Types for Navigation
export type RootStackParamList = {
  SignIn: undefined;
  Test: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
