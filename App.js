import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Vibration, View, Platform } from "react-native";
import { AppSplashScreen } from "./screens/loadingScreens/SplashScreen/AppSplashScreen";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import StackNavigator from "./navigation/StackNavigator";
import TestScreen from "./screens/TestScreen/TestScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreenEmpty";
import FontLoader from "./assets/fonts/FontLoader";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppSplashScreen onLoadingComplete={() => setLoadingComplete(true)} />
    );
  }

  // make it support multiple comps
  return (
      <ActionSheetProvider>
        <FontLoader>
          <StackNavigator>
          </StackNavigator>
        </FontLoader>
      </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
