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
import { Avatar } from "react-native-paper";
function SoilAnalysis({ navigation }) {
  // const [state, setState] = React.useState("");
  // const [indexOfState, setIndexOfState] = React.useState();
  const [toggle, setToggle] = React.useState(false);

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
            label=""
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.screenHeaderText}>Soil Anlaysis Screen</Text>
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
    marginTop: 12,
  },
});
export default SoilAnalysis;
