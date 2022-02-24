import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
// import * as firebase from "firebase";

// import { TextInput } from "react-native-paper";
// import { Button } from "react-native-paper";
function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [password, setPassword] = React.useState("");

  // handleSignIn();
  // {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("Home");
  //     } else {
  //       navigation.navigate("Login");
  //     }
  //   });
  // }

  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <Text
        style={{
          marginTop: 142,
          marginBottom: 48,
          marginLeft: 28,
          fontSize: 28,
          fontWeight: "bold",
          color: "#207502",
        }}
      >
        Login
      </Text>
      <Text style={{ marginLeft: 28 }}>Mobile number</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Text style={{ marginLeft: 28 }}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInpt}
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
      />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>LogIn</Text>
        </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // marginLeft: 28,
    // justifyContent: "center",
  },
  textInpt: {
    // justifyContent: "center",
    // alignItems: "flex-start",
    width: "80%",
    height: 36,
    fontSize: 16,
    paddingLeft: 6,
    paddingBottom: 0,
    borderBottomColor: "#207502",
    borderBottomWidth: 1,
    marginLeft: 28,
    marginTop: 6,
    marginBottom: 22,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 44,
    marginBottom: 12,
    backgroundColor: "#207502",
    width: 302,
    height: 52,
  },
  btnText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
});
export default LoginScreen;
