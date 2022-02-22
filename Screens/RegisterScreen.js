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
function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <TouchableOpacity
        style={{ flexDirection: "row", fontSize: 16 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>Already have an account? </Text>
        <Text style={{ color: "#207502", fontWeight: "bold" }}>Login</Text>
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
export default RegisterScreen;
