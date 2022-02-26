import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";

function WelcomeScreen({ navigation }) {
  // React.useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to exit?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Logo.png")}
        style={{
          height: 140,
          width: 240,
          marginTop: 120,
          marginLeft: "15%",
        }}
      />
      <View style={styles.innerContainer}>
        {/* <Text>Hello World!</Text> */}
        <TouchableOpacity
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
    marginTop: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: "#207502",

    width: 302,
    height: 52,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default WelcomeScreen;
