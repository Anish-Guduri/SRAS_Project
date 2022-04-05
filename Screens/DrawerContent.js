import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { authentication } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Drawer } from "react-native-paper";

function DrawerContent({ navigation }) {
  const [userID, setUserId] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        // setEmail(user.email);
        // setName(user.displayName);
        setUserId(user.uid);
        // Alert.alert(userID);
      } else {
        navigation.navigate("Login");
      }
    });
  });
  const handlLogOut = () => {
    signOut(authentication).catch((error) => {
      Alert.alert(error.message);
    });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={{ marginTop: 20 }}>
          <Drawer.Item
            // style={{ backgroundColor: "#64ffda" }}
            icon={() => (
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color="black"
              />
            )}
            label={<Text style={{ color: "#000", fontSize: 16 }}>Home</Text>}
            onPress={() => navigation.navigate("HomeScreen")}
          />
          <Drawer.Item
            // style={{ backgroundColor: "#64ffda" }}
            icon={() => (
              <MaterialCommunityIcons
                name="account-outline"
                size={26}
                color="black"
              />
            )}
            label={
              <Text style={{ color: "#000", fontSize: 16 }}>Edit Profile</Text>
            }
            onPress={() =>
              navigation.navigate("EditProfileScreen", { userID: userID })
            }
          />
          <Drawer.Item
            // style={{ backgroundColor: "#64ffda" }}
            icon={() => (
              <MaterialCommunityIcons
                name="store-outline"
                size={26}
                color="black"
              />
            )}
            label={
              <Text style={{ color: "#000", fontSize: 16 }}>Book Slot</Text>
            }
            onPress={() => navigation.navigate("BookYourSlotScreen")}
          />
          <Drawer.Item
            // style={{ backgroundColor: "#64ffda" }}
            icon={() => (
              <Image
                style={{ height: 26, width: 26 }}
                source={require("../assets/SoilAnalysis.png")}
              />
            )}
            label={
              <Text style={{ color: "#000", fontSize: 16 }}>Soil Analysis</Text>
            }
            onPress={() => navigation.navigate("SoilAnalysisScreen")}
          />
          <Drawer.Item
            // style={{ backgroundColor: "#64ffda" }}
            icon={() => (
              <Image
                style={{ height: 26, width: 26 }}
                source={require("../assets/CropPrice.png")}
              />
            )}
            label={
              <Text style={{ color: "#000", fontSize: 16 }}>Crop Price</Text>
            }
            onPress={() => navigation.navigate("CropPriceScreen")}
          />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handlLogOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
        <Entypo
          name="log-out"
          size={24}
          color="black"
          style={styles.logoutButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 6,
    paddingBottom: 12,
    paddingRight: 42,
  },
  logoutButtonText: {
    marginRight: 20,
    fontSize: 18,
  },
  logoutButtonIcon: {},
});
export default DrawerContent;
