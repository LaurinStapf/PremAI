import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppSplashScreen } from './screens/loadingScreens/SplashScreen/AppSplashScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AppSplashScreen/>
      <StatusBar style="auto" />
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