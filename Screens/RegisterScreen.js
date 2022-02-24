import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { initializeApp } from "firebase/app";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function RegisterScreen({ navigation }) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorName, seterrorName] = React.useState("");
  const [errorEmail, seterrorEmail] = React.useState("");
  const [errorPassword, seterrorPassword] = React.useState("");
  const [errorConfirmPassword, seterrorConfirmPassword] = React.useState("");

  // function handleLogIn() {
  //   firebase.auth().onAuthStateChanger((user) => {
  //     if (user) {
  //       navigation.navigate("OTPScreen");
  //     } else {
  //       navigation.navigate("RegisterScreen");
  //     }
  //   });
  // }
  // const auth = getAuth();
  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
      })
      .catch((re) => {
        console.log(re);
      });
  };

  function validateName(name) {
    let alpha = /^[a-zA-Z][a-zA-Z ]*$/;
    if (alpha.test(name)) {
      return true;
    } else {
      seterrorName("Name must contain only alphabets");
      return false;
    }
  }
  function validateEmail(mail) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail)) {
      return true;
    } else {
      seterrorEmail("please enter valid email");
      return false;
    }
  }
  function validatePassword(password) {
    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (regularExpression.test(password)) return true;
    else {
      seterrorPassword("please enter a valid password");
      return false;
    }
  }
  function validateConfirmPassword(confirmPassword, password) {
    if (confirmPassword == password) return true;
    else {
      seterrorConfirmPassword("password mismatch");
      return false;
    }
  }
  function validate() {
    let val1 = validateName(name);
    let val2 = validateEmail(email);
    let val3 = validatePassword(password);
    let val4 = validateConfirmPassword(confirmPassword, password);
    if (val1 && val2 && val3 && val4) {
      navigation.navigate("OTPScreen");
    }
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <Text
        style={{
          marginTop: 52,
          marginBottom: 32,
          marginLeft: 28,
          fontSize: 28,
          fontWeight: "bold",
          color: "#207502",
        }}
      >
        Register
      </Text>
      <Text style={{ marginLeft: 28 }}>Name</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter Name"
        value={name}
        onChangeText={(name) => setName(name)}
        onFocus={() => seterrorName("")}
      />
      <Text style={styles.errorText}>{errorName}</Text>
      <Text style={{ marginLeft: 28 }}>Mobile number</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        onFocus={() => seterrorEmail("")}
      />
      <Text style={styles.errorText}>{errorEmail}</Text>
      <Text style={{ marginLeft: 28 }}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInpt}
        placeholder="Enter password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        onFocus={() => seterrorPassword("")}
      />
      <Text style={styles.errorText}>{errorPassword}</Text>
      <Text style={{ marginLeft: 28 }}>Confirm Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInpt}
        placeholder="Enter password"
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        onFocus={() => seterrorConfirmPassword("")}
      />
      <Text style={styles.errorText}>{errorConfirmPassword}</Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={RegisterUser} style={styles.btn}>
          <Text style={styles.btnText}>Get OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", fontSize: 16, marginBottom: 12 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Already have an account? </Text>
          <Text style={{ color: "#207502", fontWeight: "bold" }}>Login</Text>
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
    // justifyContent: "center",
  },
  textInpt: {
    // justifyContent: "center",
    // alignItems: "center",
    width: "80%",
    height: 36,
    fontSize: 16,
    paddingLeft: 4,
    paddingBottom: 0,
    borderBottomColor: "#207502",
    borderBottomWidth: 1,
    marginLeft: 28,
    marginTop: 6,
    marginBottom: 4,
  },
  errorText: {
    marginBottom: 10,
    marginLeft: 28,
    paddingLeft: 6,
    fontSize: 12,
    color: "#a4161a",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 302,
    height: 52,
    marginTop: 44,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "#207502",
  },
  btnText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
});
export default RegisterScreen;
