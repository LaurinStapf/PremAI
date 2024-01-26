import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, Pressable, Platform, Vibration, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from "expo-haptics";
import * as Font from 'expo-font';
import CloudLogo from '../../assets/CloudLogo.svg'
import TextLogo from '../../assets/TextLogo.svg';
import ErrorLogo from '../../assets/error.svg';
import Button from '../../components/Button';
import { ArrowClockwise24Regular } from "@fluentui/react-native-icons";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface ErrorScreenProps {
  errorMessage: string;
  errorCode: string;
  children?: ReactNode; // Children ist optional
}

export function ErrorScreen({ errorMessage, errorCode, children }: ErrorScreenProps) {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);


  const screenHeight = Dimensions.get('screen').height;


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ErrorLogo />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
        {/* <Text style={styles.errorCode}>
          Fehlercode: {errorCode}
        </Text> */}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Zentriert vertikal im Container
    alignItems: 'center', // Zentriert horizontal im Container
    paddingHorizontal: 20, // Gibt horizontalen Raum auf beiden Seiten
  },
  logoContainer: {
    justifyContent: 'center', // Zentriert das SVG vertikal
    alignItems: 'center', // Zentriert das SVG horizontal
  },
  textContainer: {
    justifyContent: 'center', // Zentriert den Text vertikal
    alignItems: 'center', // Zentriert den Text horizontal
    paddingHorizontal: 20, // Gibt horizontalen Raum auf beiden Seiten für den Text
  },
  errorText: {
    textAlign: 'center', // Zentriert den Text innerhalb seiner Begrenzung
    color: '#8C8C8C',
    marginBottom: 10, // Gibt einen Abstand unter dem Fehler-Text
  },
  errorCode: {
    textAlign: 'center', // Zentriert den Code innerhalb seiner Begrenzung
    color: '#8C8C8C',
  },
});
