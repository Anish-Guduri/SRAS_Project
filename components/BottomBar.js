import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { authentication } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function BottomBar({
  onPricePress,
  onBookPress,
  onPersonPress,
}) {
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

  return (
    <View elevation={5} style={styles.bottomBar}>
      <TouchableOpacity
        elevation={10}
        style={styles.bottomButtons}
        onPress={onPricePress}
      >
        <Image
          source={require("../assets/CropPrice.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        elevation={10}
        style={styles.bottomButtons}
        onPress={onBookPress}
      >
        <MaterialCommunityIcons name="store-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        elevation={10}
        style={styles.bottomButtons}
        onPress={onPersonPress}
      >
        <MaterialCommunityIcons
          name="account-outline"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
  },
});
