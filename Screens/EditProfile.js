import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Picker,
  ScrollView,
  Alert,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  collectionGroup,
  runTransaction,
} from "firebase/firestore";
import { Avatar } from "react-native-paper";

function EditProfile({ route, navigation }) {
  const { userID } = route.params;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [errorPhoneNumber, seterrorPhoneNumber] = React.useState("");
  const [click, setClick] = React.useState(true);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    userDetails(userID);
    // slotsAvailable();
    return () => {
      setName();
      setEmail();
      setGender();
    };
  }, []);

  const userDetails = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setGender(docSnap.data().gender);
    } else {
      console.log("No such document!");
    }
  };
  const validate = () => {
    let pattern = /^[789]\d{9}$/;
    if (pattern.test(phoneNumber) && phoneNumber !== "") {
      const userRef = doc(db, "users", userID);
      setDoc(userRef, {
        name: name,
        email: email,
        gender: gender,
        phoneNumber: phoneNumber,
      }),
        Alert.alert("Data Saved Successfully");
    } else {
      seterrorPhoneNumber("Enter a Valid Phone Number");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <TouchableOpacity
          style={{ marginTop: 8, marginLeft: 12, padding: 4 }}
          onPress={() => navigation.openDrawer()}
        >
          <View
            style={{
              width: 26,
              height: 3,
              borderRadius: 24,
              marginBottom: 3,
              backgroundColor: "#fff",
            }}
          ></View>
          <View
            style={{
              width: 26,
              height: 3,
              borderRadius: 24,
              marginBottom: 3,
              backgroundColor: "#fff",
            }}
          ></View>
          <View
            style={{
              width: 26,
              height: 3,
              borderRadius: 24,
              marginBottom: 3,
              backgroundColor: "#fff",
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 40, marginTop: 4 }}>
          <Avatar.Text
            size={42}
            label="A"
            color="#207502"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text
          style={{
            marginTop: 12,
            marginBottom: 32,
            marginLeft: 28,
            fontSize: 28,
            fontWeight: "bold",
            color: "#207502",
          }}
        >
          User Details
        </Text>
        <Text
          style={{
            marginLeft: 28,
            marginTop: 12,
            fontSize: 14,
            color: "#207502",
          }}
        >
          Name
        </Text>
        <Text style={styles.textInpt}>{name}</Text>
        <Text
          style={{
            marginLeft: 28,
            marginTop: 12,
            fontSize: 14,
            color: "#207502",
          }}
        >
          Email
        </Text>
        <Text style={styles.textInpt}>{email}</Text>

        {/* <TextInput style={styles.textInpt} value={email} disabled /> */}
        <Text
          style={{
            marginLeft: 28,
            marginTop: 12,
            fontSize: 14,
            color: "#207502",
          }}
        >
          Gender
        </Text>
        {click ? (
          <Picker
            selectedValue={gender}
            style={[styles.textInpt, { height: 50, width: 150 }]}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              setClick(false);
            }}
            disabled={!click}
          >
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
          </Picker>
        ) : (
          <TouchableOpacity onPress={setClick(true)}>
            <Text style={styles.textInpt}>{name}</Text>
          </TouchableOpacity>
        )}

        {/* <Text style={styles.errorText}>{errorPassword}</Text> */}
        <Text
          style={{
            marginLeft: 28,
            marginTop: 12,
            fontSize: 14,
            color: "#207502",
          }}
        >
          Phone number
        </Text>
        <TextInput
          style={styles.textInpt}
          placeholder="Enter password"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          onFocus={() => seterrorPhoneNumber("")}
        />
        <Text style={styles.errorText}>{errorPhoneNumber}</Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => validate()} style={styles.btn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flexDirection: "row",
    width: "100%",
    height: "12%",
    paddingTop: 16,
    paddingLeft: 16,
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileViewText: {
    color: "#fff",
    marginTop: 8,
    paddingLeft: 20,
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
    width: 240,
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
export default EditProfile;
