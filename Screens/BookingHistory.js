import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication, db } from "../firebase";
import Menu from "../components/Menu";
import BottomBar from "../components/BottomBar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  addDoc,
  collectionGroup,
  runTransaction,
} from "firebase/firestore";
import { Avatar } from "react-native-paper";
// import { collection, addDoc, setDoc, doc } from "firebase/firestore";
function BookingHistory({ route, navigation }) {
  const { userID } = route.params;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [slotCount, setSlotCount] = React.useState(0);
  const [bookingData, setBookingData] = React.useState([]);
  // const [name, setName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  React.useEffect(async () => {
    userDetails(userID);
    // const q = query(collection(db, "users",userID,"bookingHistory"));
    const q = await getDocs(collection(db, "cities", userID, "bookingHistory"));
    const querySnapshot = await getDocs(
      collection(db, "users", userID, "bookingHistory")
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      // setBookingData(doc.data());
      setBookingData((currentObject) => [...currentObject, doc.data()]);
      console.log(bookingData);
    });
    return () => {
      setName();
      setEmail();
      setGender();
      setSlotCount();
      setData([]);
    };
  }, []);

  const userDetails = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
    } else {
      console.log("No Reults");
    }
  };
  const cnacelSlot = async () => {
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

  const getcrop = async (email) => {
    const subColRef = query(
      collection(db, "marketAdmin", email, "crops"),
      where("cropName", "==", "wheat")
    );
    const qSnap = await getDocs(subColRef);
    qSnap.forEach((doc) => {
      setData((currentObject) => [...currentObject, doc.data()]);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <Menu OnPress={() => navigation.openDrawer()} screenName="History" />
        <TouchableOpacity style={{ marginRight: 40, marginTop: 4 }}>
          <Avatar.Text
            size={42}
            label="A"
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          color: "#207502",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Booking History
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",

          margin: 16,
        }}
      >
        {bookingData.length != 0 ? (
          <FlatList
            data={bookingData}
            renderItem={({ item }) => (
              <View>
                <View style={styles.dataContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.dataLabel}>Market:</Text>
                    <Text style={styles.actualData}>{item.market}</Text>
                    <Text style={styles.dataLabel}>Minimum Price:</Text>
                    <Text style={styles.actualData}>{item.minimumPrice}</Text>
                  </View>
                  <View style={styles.rowData}>
                    <Text style={styles.dataLabel}>Crop:</Text>
                    <Text style={styles.actualData}>{item.crop}</Text>

                    <Text style={styles.dataLabel}>date:</Text>
                    <Text style={styles.actualData}>{item.date}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: 36,
                      width: "40%",
                      marginLeft: "56%",
                      marginTop: 8,
                      backgroundColor: "#207502",
                      alignItem: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                    onPress={() => bookSlot(item.email)}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      Cancel Slot
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              borderWidth: 1,
              borderColor: "#207502",
            }}
          >
            <Text>No Slot Booking History found</Text>
          </View>
        )}
      </View>
      <BottomBar
        style={{ marginBottom: 6 }}
        onPersonPress={() => {
          navigation.navigate("EditProfileScreen", { userID: userID });
        }}
        onPricePress={() => {
          navigation.navigate("CropPriceScreen");
        }}
        onBookPress={() => {
          navigation.navigate("BookYourSlotScreen");
        }}
      />
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
  table: {
    flexDirection: "row",
    // marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#207502",
    height: "8%",
  },
  tableHeaderText: {
    width: "25%",
    height: "100%",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    padding: 4,
    alignItems: "center",
    justifyContent: "center",

    // borderRightColor: "#fff",
    // borderRightWidth: 1,
  },
  tableDataColoumn: {
    width: "25%",
    height: "100%",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: "#207502",
    alignItems: "center",
  },
  dataContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#86340A",
    borderRadius: 16,
    marginBottom: 8,
  },
  dataLabel: {
    marginRight: 6,
    color: "#207502",
    fontWeight: "bold",
  },
  rowData: {
    flexDirection: "row",
    marginTop: 6,
  },
  actualData: {
    marginRight: 24,
  },
});
export default BookingHistory;
