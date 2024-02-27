import React from "react";
import { View, Text} from "react-native";
import { removeToken } from "../../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";

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
      <Button title="Log Out" onPress={logout} style={{ alignSelf: "center", marginTop: 20 }}/>
    </View>
  );
};

export default TestScreen;
