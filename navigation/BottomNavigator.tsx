import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';

// Screens
import HomeScreenEmpty from '../screens/HomeScreen/HomeScreenEmpty';
import TestScreen from '../screens/TestScreen/TestScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator : React.FC = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreenEmpty} options={{}} />
        <Tab.Screen name="Test" component={TestScreen} />
      </Tab.Navigator>
    );
}

export default BottomNavigator;