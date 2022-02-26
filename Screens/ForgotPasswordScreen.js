import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { authentication } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = React.useState();
  const [errorEmail, seterrorEmail] = React.useState();
  const handleForgotPassword = () => {
    const emailRegex =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (emailRegex.test(email)) {
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.code + "  " + error.message);
          Alert.alert(error.code + "  " + error.message);
          // ..
        });
    } else {
      seterrorEmail("Enter a valid email");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <Text
        style={{
          marginTop: 82,
          marginBottom: 48,
          marginLeft: 28,
          fontSize: 28,
          fontWeight: "bold",
          color: "#207502",
        }}
      >
        Forgot Password
      </Text>
      <Text style={{ marginLeft: 28, marginBottom: 80, color: "#86340A" }}>
        We will send you an email to reset password on below mentioned email
      </Text>
      <Text style={{ marginLeft: 28 }}>Email</Text>
      <TextInput
        style={styles.textInpt}
        placeholder="Enter email"
        value={email}
        keyboardType="email-address"
        onFocus={() => seterrorEmail("")}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.errorText}>{errorEmail}</Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity mode="contained" style={styles.btn}>
          <Text style={styles.btnText} onPress={handleForgotPassword}>
            Send
          </Text>
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
export default ForgotPasswordScreen;
