import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
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
import Menu from "../components/Menu";
// import { authentication } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
function MarketDetails({ route, navigation }) {
  const { state, district, crop } = route.params;
  const [userID, setUserId] = React.useState(null);
  const [slotCount, setSlotCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigation.navigate("Login");
      }
    });
    getSlotData();
  }, []);
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

    const q = query(
      collection(db, "marketAdmin"),
      where("district", "==", district)
    );
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
    if (data.length == 0) {
      Alert.alert("No markets Found");
    }
  };
  const getcrop = async (email) => {
    const subColRef = query(
      collection(db, "marketAdmin", email, "crops"),
      where("cropName", "==", crop)
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
        <Menu OnPress={() => navigation.openDrawer()} />
        <TouchableOpacity style={{ marginRight: 40, marginTop: 4 }}>
          <Avatar.Text
            size={42}
            label="A"
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Hello</Text>
        <Text>{state}</Text>
        <Text>{district}</Text>
        <Text>{crop}</Text>
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
    height: 78,
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
  searchbleBox: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  textInputBox: {
    height: 42,
    width: "68%",
    marginTop: "10%",
  },
  searchbleBoxText: {
    height: 40,
    paddingLeft: 12,
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#86340A",
  },
  dropDownContainer: {
    flex: 1,
    maxHeight: "50%",
    width: "68%",
    paddingTop: 1,
    paddingRight: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#86340A",
  },
  dropDownItems: {
    padding: 4,
    fontSize: 18,
    // height: 38,
  },
  bottomBar: {
    flexDirection: "row",
    height: "8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  bottomButtons: {
    flex: 3,
    padding: 6,
    alignItems: "center",
    // justifyContent: "center",
  },
});
export default MarketDetails;
