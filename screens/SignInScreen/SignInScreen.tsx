import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";
import AccountAvatar from "../../assets/account-avatar.svg";
import AppleAuthButton from "../../components/Buttons/AppleAuthButton/AppleAuthButton";
import GoogleAuthButton from "../../components/Buttons/GoogleAuthButton/GoogleAuthButton";
import PremAiLogo from "../../assets/TextLogo.svg";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

const screenHeight = Dimensions.get("screen").height;

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};
const Divider = (props: any) => {
  return (
    <View {...props}>
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }} />
    </View>
  );
};

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Properties
  const [email, setEmail] = useState("elias.unity@gmail.com");
  const [password, setPassword] = useState("1234");

  const onSignInPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        await AsyncStorage.setItem("userToken", userCredential.user.uid);

        userCredential.user
          .getIdToken()
          .then(async (token: string) => {
            await AsyncStorage.setItem("userToken", token);
          })
          .catch((error) => {
            alert(error);
          });

        navigation.navigate("Test");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <AccountAvatar />

      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={styles.button}
        title="Login"
        onPress={() => onSignInPress()}
      />

      <Divider style={{ margin: 10 }}>
        <Text
          style={{ color: "#000", fontWeight: "bold", backgroundColor: "#333" }}
        >
          OR
        </Text>
      </Divider>

      <AppleAuthButton />

      <GoogleAuthButton />

      <PremAiLogo
        style={{
          top: Platform.OS === "ios" ? screenHeight * 0.22 : screenHeight * 0.3,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    margin: 10,
  },
  button: {
    margin: 10,
  },
});

export default SignInScreen;
