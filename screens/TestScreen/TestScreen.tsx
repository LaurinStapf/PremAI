import React from "react";
import { View, Text, Button } from "react-native";
import { removeToken } from "../../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";

type TestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Test"
>;

type Props = {
  navigation: TestScreenNavigationProp;
};

const TestScreen: React.FC<Props> = () => {

  const navigation = useNavigation<TestScreenNavigationProp>(); 
  const logout = async () => {
    try {
      await removeToken();
      navigation.navigate("SignIn");
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Test Screen</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

export default TestScreen;
