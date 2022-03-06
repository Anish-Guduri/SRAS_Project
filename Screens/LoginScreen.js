import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen({ navigation }) {
  React.useEffect(() => {
    let mount = true;

    return () => {
      mount = false;
      setEmail("");
      setPassword("");
    };
  }, []);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log("Signed in");
        Alert.alert("Logged In Succesfully");
        navigation.navigate("Home");

        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

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
      <Text style={{ marginLeft: 28 }}>Email</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={{ marginTop: 26, marginLeft: 28 }}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInpt}
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={{ alignItems: "flex-end", marginRight: "12%" }}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        <Text
          style={{
            color: "#86340A",
            textDecorationLine: "underline",
          }}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          mode="contained"
          onPress={handleSignIn}
          style={styles.btn}
        >
          <Text style={styles.btnText}>LogIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}
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
    marginBottom: 4,
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
