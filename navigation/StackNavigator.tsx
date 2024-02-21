import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Screens
import TestScreen from '../screens/TestScreen/TestScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';

// Bottom Navigator
import BottomNavigator from './BottomNavigator';

// Types for Navigation
export type RootStackParamList = {
  AuthLoading: undefined;
  Test: undefined;
  SignIn: undefined;
  BottomNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsSignedIn(!!userToken);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSignedIn ? 'BottomNavigator' : 'SignIn'}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        {/* Weitere Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;