import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function SplashScreen({ navigation }) {
  return (
    <View>
      <Image source={require("../assets/Logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default SplashScreen;
