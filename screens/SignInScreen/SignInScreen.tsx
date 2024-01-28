import React from "react";
import { View, TextInput, StyleSheet, Text,  } from "react-native";
import Button from "../../components/Button";

import AccountAvatar from "../../assets/account-avatar.svg";
//import { Divider } from "react-native-paper";
import AppleAuthButton from "../../components/Buttons/AppleAuthButton/AppleAuthButton";
import GoogleAuthButton from "../../components/Buttons/GoogleAuthButton/GoogleAuthButton";

// create a divider component with inline styles!
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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //centre the content
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //style the text input make it wider and do something like fluent does from styles
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
