import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
// import { TextInput } from "react-native-paper";
// import { Button } from "react-native-paper";
function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <Text
        style={{
          marginTop: 142,
          marginBottom: 48,
          fontSize: 28,
          fontWeight: "bold",
          color: "#207502",
        }}
      >
        Login
      </Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.textInpt}
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", fontSize: 16 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ justifyContent: "center" }}>
          Don't have an account?{" "}
        </Text>
        <Text
          style={{
            color: "#207502",
            fontWeight: "bold",
          }}
        >
          Create One
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        mode="contained"
        onPress={() => navigation.navigate("Register")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    marginLeft: 28,
    // justifyContent: "center",
  },
  textInpt: {
    // justifyContent: "center",
    // alignItems: "flex-start",
    width: 272,
    height: 36,
    fontSize: 16,
    borderBottomColor: "#207502",
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 8,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 44,
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
export default LoginScreen;
