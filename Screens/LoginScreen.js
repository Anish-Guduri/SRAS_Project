import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#207502"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", fontSize: 16 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>Don't have an account? </Text>
        <Text style={{ color: "#207502" }}>Create One</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreen;
