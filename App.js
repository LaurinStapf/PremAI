import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Vibration, View, Platform } from "react-native";
import { AppSplashScreen } from "./screens/loadingScreens/SplashScreen/AppSplashScreen";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import Button from "./components/Button";
import StackNavigator from "./navigation/StackNavigator";
import TestScreen from "./screens/TestScreen/TestScreen";
import TextInput from "./components/InputFields/TextInput";
import Card from "./components/Card/Card";
import { ErrorScreen } from "./screens/errorScreens/ErrorScreen";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppSplashScreen onLoadingComplete={() => setLoadingComplete(true)} />
    );
  }

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    //   <Button
    //     style={{ margin: 10 }}
    //     title="This is a test"
    //     iconName="ArrowClockwise20Regular"
    //     design="primary"
    //     onPress={() => alert("Button pressed")}
    //     onLongPress={() => {Platform.OS == 'android' ? Vibration.vibrate(1 * 40) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} } />
    //     <Card iconName="Server24Regular" title="Servername XYZ" description="192.178.68.1"></Card>
    //     <TextInput placeholder="Password" label="Password" iconName="Password24Filled" style={{margin: 50}}/>
    // </View>
      <ErrorScreen errorMessage="Es sieht so aus, als wäre ein Fehler aufgetreten. Bitte versuche es erneut!"> 
        <Button 
          style={{ margin: 20 }}
          title="This is a test"
          iconName="ErrorCircle24Regular"
          design="primary"
          onPress={() => alert("Button pressed")}
          onLongPress={() => {Platform.OS == 'android' ? Vibration.vibrate(1 * 40) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} }
        />
      </ErrorScreen>
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
