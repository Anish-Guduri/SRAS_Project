import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function SplashScreen({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Welcome")}
      style={styles.container}
    >
      <Image
        source={require("../assets/Logo.png")}
        style={{ height: 200, width: 200 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
