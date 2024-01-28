// FontLoader.tsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    // Andere Schriftarten können hier hinzugefügt werden
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default FontLoader;
