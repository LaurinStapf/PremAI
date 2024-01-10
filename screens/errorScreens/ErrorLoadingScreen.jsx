import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import CloudLogo from '../../../assets/loadingError.svg';
import TextLogo from '../../../assets/TextLogo.svg';
import { ArrowClockwise24Regular } from "@fluentui/react-native-icons";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function AppSplashScreen() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const screenHeight = Dimensions.get('screen').height;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}
      onLayout={onLayoutRootView}>
      {/* <Text>SplashScreen Demo! 👋</Text> */}
      <View style={{top: (Platform.OS === 'ios') ? screenHeight * -0.08 : screenHeight * -0.06}}>
        <CloudLogo/>
        <Text style={{textAlign: 'center', color:'#8C8C8C'}}>Sieht so aus als wäre ein Fehler aufgetreten!{"\n"}Bitte versuche es erneut...</Text>
      </View>
      <Pressable style={{backgroundColor:'#1868F1', height:52, width:295, borderRadius:12, alignItems:'center', gap:8, display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <ArrowClockwise24Regular style={{color:'white'}}/>
        <Text style={{color:'white', fontSize:17,}}>Verbindung wiederherstellen</Text>
      </Pressable>
      {/* <TextLogo style={{top: (Platform.OS === 'ios') ? screenHeight * 0.20 : screenHeight * 0.22}}/> */}

    </View>
  );
}