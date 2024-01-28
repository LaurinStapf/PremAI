import React from "react";
import { View, TextInput, StyleSheet, Text, Platform, Dimensions,  } from "react-native";
import Button from "../../components/Button";

import AccountAvatar from "../../assets/account-avatar.svg";
import AppleAuthButton from "../../components/Buttons/AppleAuthButton/AppleAuthButton";
import GoogleAuthButton from "../../components/Buttons/GoogleAuthButton/GoogleAuthButton";

import PremAiLogo from "../../assets/TextLogo.svg";

const screenHeight = Dimensions.get('screen').height;

const Divider = (props: any) => {
  return (
    <View {...props}>
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }} />
    </View>
  );
};
const SignInScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AccountAvatar />

      <TextInput style={styles.textInput} placeholder="Username" />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        style={styles.button}
        title="Login"
        onPress={() => console.log("Sign In")}
      />


      <Divider style={{ margin: 10}} >
        <Text style={{ color: "#000", fontWeight: "bold", backgroundColor: '#333' }}>OR</Text>
      </Divider>

      <AppleAuthButton />

      <GoogleAuthButton />

      <PremAiLogo style={{top: (Platform.OS === 'ios') ? screenHeight * 0.22 : screenHeight * 0.30}}/>

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
