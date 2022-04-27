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
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import BottomBar from "../components/BottomBar";
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
function MarketDetails({ route, navigation }) {
  const { state, district, crop } = route.params;
  // const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [marketData, setMarketData] = React.useState([]);
  const [userID, setUserId] = React.useState(null);
  const [loading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigation.navigate("Login");
      }
    });
    setData([]);
    async () => {
      setData([]);
      setLoading(true);
      console.log("Button clicked");
      const q = query(
        collection(db, "marketAdmin"),
        where("district", "==", district)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        getcrop(doc.id);
      });
      console.log(
        "========================= Book Your Slot =============================="
      );
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].cropName);
        console.log(data[i].minimumPrice);
        console.log(data[i].slotsAvilable);
        console.log("---------------------");
      }
    };
    setLoading(false);
    getSlotData();
  }, []);

  const getSlotData = async () => {
    setData([]);
    console.log("Button clicked");
    const q = query(
      collection(db, "marketAdmin"),
      where("district", "==", district)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMarketData((currentObject) => [...currentObject, doc.data()]);
      getcrop(doc.id);
    });
    console.log(
      "========================= Book Your Slot =============================="
    );
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].cropName);
      console.log(data[i].minimumPrice);
      console.log(data[i].slotsAvilable);
      console.log("---------------------");
    }
    // if (data.length == 0) {
    //   Alert.alert("No markets Found");
    // }
  };
  const getcrop = async (email) => {
    const subColRef = query(
      collection(db, "marketAdmin", email, "crops"),
      where("cropName", "==", crop)
    );
    const qSnap = await getDocs(subColRef);
    qSnap.forEach((doc) => {
      setData((currentObject) => [...currentObject, doc.data()]);
    });
  };
  const bookSlot = async (email) => {
    // Alert.alert("clicked");

    const sfDocRef = doc(db, "marketAdmin", email, "crops", crop);

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
            Alert.alert("Slot Booked SuccessFully!");
            navigation.navigate("BookYourSlotScreen");
            return newSlots;
          } else {
            Alert.alert("No Slots Available");
            return Promise.reject("Sorry! slotsAvilable  are not available");
          }
        }
      );

      // console.log("slotsAvilable increased to ", newSlotsAvailable);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <Menu OnPress={() => navigation.openDrawer()} screenName="Markets" />
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
        Available Markets in {district}
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: 24,
          marginBottom: 12,
          margin: 16,
        }}
      >
        {loading && (
          <ActivityIndicator
            style={{ height: 120 }}
            color="#207502"
            size="large"
          />
        )}
        {data.length != 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View>
                <View style={styles.dataContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.dataLabel}>Market:</Text>
                    <Text style={styles.actualData}>{item.marketName}</Text>
                    <Text style={styles.dataLabel}>Crop:</Text>
                    <Text style={styles.actualData}>{item.cropName}</Text>
                  </View>
                  <View style={styles.rowData}>
                    <Text style={styles.dataLabel}>Minimum Price:</Text>
                    <Text style={styles.actualData}>{item.minimumPrice}</Text>
                    {/* <Text>{marketData.marketName}</Text> */}
                    <Text style={styles.dataLabel}>slots Available:</Text>
                    <Text style={styles.actualData}>{item.slotsAvilable}</Text>
                  </View>

                  {/* <View style={styles.rowData}>
                    <Text style={styles.dataLabel}>email:</Text>
                    <Text style={styles.actualData}>{item.email}</Text> */}
                  {/* <Text>{marketData.marketName}</Text> */}
                  {/* <Text style={styles.dataLabel}>District:</Text> */}
                  {/* <Text style={styles.actualData}>{item.district}</Text> */}
                  {/* </View> */}
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
                      Book Slot
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity></TouchableOpacity> */}
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
            <Text>No Results Currently found</Text>
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
export default MarketDetails;
