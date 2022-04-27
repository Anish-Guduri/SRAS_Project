import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication, db } from "../firebase";
import BottomBar from "../components/BottomBar";
import Menu from "../components/Menu";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Avatar } from "react-native-paper";
function SoilAnalysis({ route, navigation }) {
  const { userID, userName } = route.params;
  const [moisturePercentage, setMoisturePercentage] = React.useState(0);
  const [isDataCalled, setIsDataCalled] = React.useState(false);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    userDetails(userID);
    setIsDataCalled(false);
    return () => {};
  }, []);
  const userDetails = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setMoisturePercentage(docSnap.data().moisturePercentage);
      setData(docSnap.data().moistureData);
      console.log(data);
    } else {
      console.log("No such document!");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <Menu
          OnPress={() => navigation.openDrawer()}
          screenName="Soil Analysis"
        />
        <TouchableOpacity style={{ marginRight: 40, marginTop: 4 }}>
          <Avatar.Text
            size={42}
            label={userName.charAt(0).toUpperCase()}
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.screenHeaderText}>Soil Anlaysis</Text>

      {!isDataCalled ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.table}>
            <Text style={styles.tableHeaderText}>
              Device Moisture Percentage
            </Text>
          </View>
          <Text style={styles.tableDataColoumn}>{moisturePercentage}</Text>
          <View style={[styles.table, { marginTop: "16%" }]}>
            <Text style={styles.tableHeaderText}>
              Ideal Moisture Percentage Range
            </Text>
          </View>
          <Text style={styles.tableDataColoumn}> 60% - 80% </Text>

          <TouchableOpacity
            style={{
              marginTop: "24%",
              width: "80%",
              height: "10%",
              backgroundColor: "#207502",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
            }}
            onPress={() => setIsDataCalled(true)}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
            >
              Soil Data
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={[styles.table, { width: "94%" }]}>
            <Text style={[styles.tableHeaderText, { width: "43.8%" }]}>
              Date
            </Text>
            <Text
              style={[
                styles.tableHeaderText,
                { borderLeftColor: "#fff", borderLeftWidth: 2 },
              ]}
            >
              Moisture Percentage
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#207502",
                }}
              >
                <Text
                  style={[
                    styles.tableDataColoumn,
                    {
                      width: "47%",
                      height: "25%",
                      borderLeftWidth: 1,
                      borderLeftColor: "#207502",
                    },
                  ]}
                >
                  {item.moisturePercentage}"hello"
                </Text>
                <Text
                  style={[
                    styles.tableDataColoumn,
                    { width: "47%", height: "25%" },
                  ]}
                >
                  {item.moisturePercentage}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
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
  screenHeaderText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#207502",
    marginTop: 12,
    marginBottom: 24,
  },
  table: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#207502",
    height: "10%",
    width: "80%",
  },
  tableHeaderText: {
    // width: "25%",
    height: "80%",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    marginRight: 12,
    marginLeft: 12,
  },
  tableDataColoumn: {
    width: "80%", //47
    height: "10%",
    padding: 8,
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#207502",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SoilAnalysis;
