import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
// import { authentication } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  runTransaction,
} from "firebase/firestore";
import { Avatar } from "react-native-paper";

function EditProfile({ route, navigation }) {
  const { userID } = route.params;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [slotCount, setSlotCount] = React.useState(0);
  React.useEffect(() => {
    userDetails(userID);
    // slotsAvailable();
    return () => {
      setName();
      setEmail();
      setGender();
      setSlotCount();
    };
  }, []);

  const userDetails = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
      setGender(docSnap.data().email);
      setEmail(docSnap.data().gender);
    } else {
      console.log("No such document!");
    }
  };
  // const slotsAvailable = async () => {
  //   const docRef = doc(db, "slotBooking", "market");
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setSlotCount(docSnap.data().slotAvailable);
  //   } else {
  //     console.log("No such document!");
  //   }
  // };

  const bookSlot = async () => {
    console.log("Button clicked");
    // const docRef = doc(db, "slotBooking", "market");
    // try {
    //   const count = await runTransaction(db, async (transaction) => {
    //     const sfDoc = await transaction.get(docRef);
    //     if (!sfDoc.exists()) {
    //       throw "Document does not exist!";
    //     }

    //     const newCount = sfDoc.data().slotAvailable - 1;
    //     if (newCount >= 0) {
    //       transaction.update(docRef, { slotAvailable: newCount });
    //       const docSnap = await getDoc(docRef);
    //       setSlotCount(docSnap.data().slotAvailable - 1);
    //       return newCount;
    //     } else {
    //       Alert.alert("Booking full");
    //       return Promise.reject("Sorry! Population is too big");
    //     }
    //   });
    //   console.log("Population increased to ", count);
    // } catch (e) {
    //   // This will be a "population is too big" error.
    //   console.error(e);
    // }
    // const q = query(collection(db, "users"));
    // const q = query(
    //   collection(db, "slotBooking"),
    //   where("district", "==", Thane)
    // );
    const crop = "wheat";
    const slotAvailablity = crop + ".slotsAvailable";
    console.log(slotAvailablity);
    const q = query(
      collection(db, "slotBooking"),
      where(slotAvailablity, "==", 3)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
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
          {/* <MaterialCommunityIcons name="account" size={32} color="#fff" /> */}
          <Avatar.Text
            size={42}
            label="A"
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center" }}>Edit Profile Screen</Text>
      <View style={{ margin: 24, padding: 12 }}>
        <Text
          style={{
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            marginBottom: 8,
            // height: 52,
          }}
        >
          {email}
        </Text>
        <Text
          style={{
            marginBottom: 8,
            // height: 52,
          }}
        >
          {gender}
        </Text>
      </View>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <Text style={{ marginBottom: 24 }}>Available Slots : {slotCount}</Text>
        <TouchableOpacity
          style={{
            height: 52,
            width: "64%",
            backgroundColor: "#207502",
            alignItem: "center",
            justifyContent: "center",
            borderRadius: 12,
          }}
          onPress={bookSlot}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            Book Slot
          </Text>
        </TouchableOpacity>
      </View>
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
});
export default EditProfile;
