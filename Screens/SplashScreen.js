import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { authentication } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Alert } from "react-native-web";
function SplashScreen({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => {
      Alert.alert("Hello");
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          navigation.replace("Home");
          // ...
        } else {
          navigation.replace("Welcome");
        }
      });
    }, 3000);
  });

  return (
    <ImageBackground
      source={require("../assets/splashSky.jpeg")}
      imageStyle={{ opacity: 0.7 }}
      style={styles.container}
    >
      <Image
        source={require("../assets/Logo.png")}
        style={{ height: 200, width: 200 }}
      />
    </ImageBackground>
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
