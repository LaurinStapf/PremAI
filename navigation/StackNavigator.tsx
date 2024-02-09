// StackNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getUserToken } from "../utils/asyncStorage";
// Screens
import TestScreen from "../screens/TestScreen/TestScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenEmpty from "../screens/HomeScreen/HomeScreenEmpty";

// Types for Navigation
export type RootStackParamList = {
  HomeScreenEmpty: undefined;
  SignIn: undefined;
  Test: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* DevNote: We need to add token validation when we sell the App (Security Concerns)*/}
        {getUserToken() === null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />    
        ) : (
          // ToDo: Add Bottom Tab Navigator here
          <Stack.Screen name="Test" component={TestScreen} />
        )}
        <Stack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;