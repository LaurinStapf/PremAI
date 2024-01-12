import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Vibration, View, Platform } from 'react-native';
import { AppSplashScreen } from './screens/loadingScreens/SplashScreen/AppSplashScreen';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import Button from './components/Button';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppSplashScreen onLoadingComplete={() => setLoadingComplete(true)} />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        style={{ margin:30 }}
        title="This is a test"
        iconName="ArrowClockwise20Regular"
        design="primary"
        onPress={() => alert("Button pressed")}
        onLongPress={() => {Platform.OS == 'android' ? Vibration.vibrate(1 * 40) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} } />
    </View>
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