import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authentication } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
function HomeScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
        // ...
      } else {
        navigation.navigate("Login");
      }
    });

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  function handlLogOut() {
    signOut(authentication).catch((error) => {
      Alert.alert(error.message);
    });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace("Welcome")}>
        <Text>Screen {email}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#207502",
          marginTop: 20,
          borderRadius: 16,
          height: 46,
          width: 204,
        }}
        onPress={() => {
          handlLogOut();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#a82",
  },
});
export default HomeScreen;
