import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { authentication, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
function RegisterScreen({ navigation }) {
  // const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorName, seterrorName] = React.useState("");
  const [errorEmail, seterrorEmail] = React.useState("");
  const [errorPassword, seterrorPassword] = React.useState("");
  const [errorConfirmPassword, seterrorConfirmPassword] = React.useState("");

  const RegisterUser = () => {
    if (validate()) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(() => {
          const user = authentication.currentUser;

          updateProfile(authentication.currentUser, {
            displayName: name,
          })
            .then(() => {
              try {
                const docRef = setDoc(doc(db, "users", user.uid), {
                  email: email,
                  name: name,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }

              // Alert.alert("Profile Created successfully!");
              console.log(
                user.displayName +
                  " " +
                  user.email +
                  " " +
                  user.uid +
                  " " +
                  user.emailVerified
              );
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
          Alert.alert("Account created successfully!");
          sendEmailVerification(authentication.currentUser).then(() => {
            Alert("Email Sent ,Please verify your email before login");
          });
          navigation.navigate("Login");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
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
    let reg =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

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
      return true;
    } else {
      return false;
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
      <Text style={{ marginLeft: 28 }}>Email</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
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
          <Text style={styles.btnText}>Register</Text>
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
  },
  textInpt: {
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
