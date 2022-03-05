import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import { DrawerActions } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import SearchableDropdown from "react-native-searchable-dropdown";

function CropPrice({ navigation }) {
  const items = [
    //name key is must.It is to show the text in front
    { id: 1, name: "Maharashtra" },
    { id: 2, name: "Gujarat" },
    { id: 3, name: "Tamilnadu" },
    { id: 4, name: "Madhya Pradesh" },
    { id: 5, name: "Punjab" },
    { id: 6, name: "Telangana" },
    { id: 7, name: "Andhra Pradesh" },
    { id: 8, name: "Rajasthan" },
    { id: 9, name: "Uttar Pradesh" },
    { id: 10, name: "Uttar Pradesh" },
  ];
  const districts = [
    //name key is must.It is to show the text in front
    { id: 1, name: "Satara" },
    { id: 2, name: "Karimnagar" },
    { id: 3, name: "Aurangabad" },
    { id: 4, name: "Thane" },
    { id: 5, name: "Ratnagiri" },
  ];

  const [serverData, setServerData] = React.useState([]);

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
          <Avatar.Text size={36} label="A" color="white" />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center" }}>Crop Price Screen</Text>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={(item) => alert(JSON.stringify(item))}
        // style={{
        //   width: "60%",
        //   height: 24,
        //   borderColor: "#000",
        //   borderWidth: 2,
        // }}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{ padding: 5, height: "80%" }}
        // //suggestion container style
        textInputStyle={{
          //inserted text style
          padding: 12,
          borderWidth: 1,
          width: 270,
          borderColor: "#ccc",
          borderRadius: 8,
          backgroundColor: "#FAF7F6",
        }}
        itemStyle={{
          //single dropdown item style
          padding: 10,
          marginTop: 2,
          backgroundColor: "#FAF9F8",
          borderColor: "#bbb",
          borderRadius: 8,
          borderWidth: 1,
        }}
        // itemTextStyle={{
        //   //text style of a single dropdown item
        //   color: "#222",
        // }}
        itemsContainerStyle={{
          //items container style you can pass maxHeight
          //to restrict the items dropdown hieght
          height: "100%",
          padding: 8,
          borderColor: "#000",
          borderRadius: 8,
          borderWidth: 1,
        }}
        items={items}
        //mapping of item array
        defaultIndex={0}
        //default selected item index
        placeholder="Type State"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
  },
  profileView: {
    flexDirection: "row",
    width: "100%",
    height: "12%",
    paddingTop: 16,
    paddingLeft: 16,
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
});
export default CropPrice;
