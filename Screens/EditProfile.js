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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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
  const [slotCount, setSlotCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    userDetails(userID);
    // slotsAvailable();
    return () => {
      setName();
      setEmail();
      setGender();
      setSlotCount();
      // setData([]);
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
  // const slotsAvailable = async () => {
  //   const docRef = doc(db, "slotBooking", "market");
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setSlotCount(docSnap.data().slotsAvailable);
  //   } else {
  //     console.log("No such document!");
  //   }
  // };
  const bookSlot = async () => {
    Alert.alert("clicked");

    const sfDocRef = doc(
      db,
      "marketAdmin",
      "harshguduri@yahoo.com",
      "crops",
      "wheat"
    );

    try {
      const newSlotsAvailable = await runTransaction(
        db,
        async (transaction) => {
          const sfDoc = await transaction.get(sfDocRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }

          const newSlots = sfDoc.data().slotsAvilable - 1;
          if (newSlots >= 0) {
            transaction.update(sfDocRef, { slotsAvilable: newSlots });
            return newSlots;
          } else {
            Alert.alert("No Slots Available");
            return Promise.reject("Sorry! slotsAvilable  are not available");
          }
        }
      );

      console.log("slotsAvilable increased to ", newSlotsAvailable);
    } catch (e) {
      console.error(e);
    }
  };
  const getSlotData = async () => {
    setData([]);
    console.log("Button clicked");
    // const crops = query(
    //   collectionGroup(db, "crops"),
    //   where("cropName", "==", "corn")
    //   // where("slotsAvilable", ">", 0)
    // );
    // const querySnapshot = await getDocs(crops);
    // querySnapshot.forEach((doc) => {
    //   // console.log(doc.data());
    //   setData((currentObject) => [...currentObject, doc.data()]);
    // });
    //

    const q = query(collection(db, "marketAdmin"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      getcrop(doc.id);
    });
    console.log(
      "========================Below is the Data======================"
    );
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].cropName);
      console.log(data[i].minimumPrice);
      console.log(data[i].slotsAvilable);
      console.log("---------------------");
    }
  };
  const getcrop = async (email) => {
    const subColRef = query(
      collection(db, "marketAdmin", email, "crops"),
      where("cropName", "==", "wheat")
    );
    const qSnap = await getDocs(subColRef);
    qSnap.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data().slotsAvilable);
      // setData(doc.data());
      // console.log(data);
      setData((currentObject) => [...currentObject, doc.data()]);
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
        <Text
          style={{
            marginBottom: 8,
            // height: 52,
          }}
        >
          {userID}
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
        <TouchableOpacity
          style={{
            height: 52,
            width: "64%",
            marginTop: 24,
            backgroundColor: "#207502",
            alignItem: "center",
            justifyContent: "center",
            borderRadius: 12,
          }}
          onPress={getSlotData}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            get slot data
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
