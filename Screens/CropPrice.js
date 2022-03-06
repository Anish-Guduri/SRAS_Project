import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { DrawerActions } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import SearchableDropdown from "react-native-searchable-dropdown";

// import { ScrollView } from "react-native-gesture-handler";
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
  { id: 6, name: "Ahmednagar" },
];

function CropPrice({ navigation }) {
  const [state, setState] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState();
  const [district, setDistrict] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  //   async UpdateNews() {
  //     this.props.setProgress(10);
  //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //     // this.props.setProgress(30);
  //     this.setState({ loading: true })
  //     let data = await fetch(url);
  //     this.props.setProgress(60);
  //     let parsedData = await data.json();
  //     console.log(parsedData.json);
  //     this.setState({
  //         articles: parsedData.articles,
  //         totalResults: parsedData.totalResults,
  //         loading: false
  //     })
  //     this.props.setProgress(100);
  // }

  const handlFetchCropPrice = (state, district) => {
    setData([]);
    setLoading(true);
    // console.log("Crop Price" + state + district);
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001df20ab572c9b421b5111effe484d013c&format=json&limit=500&filters[state]=${state}&filters[district]=${district}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        // console.log(data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    // <KeyboardAwareScrollView
    //   extraScrollHeight={100}
    //   enableOnAndroid={true}
    //   extraHeight={80}
    // >
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <TouchableOpacity
          style={{ marginTop: 8, marginLeft: 12, padding: 4 }}
          // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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

      {/* <ScrollView> */}
      <Text
        style={{
          textAlign: "center",
          color: "#86340A",
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        Select State and District to view price of different crops
      </Text>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        // selectedItems={selectedItems}
        onItemSelect={(item) => {
          setState(item.name);
        }}
        // style={{
        //   width: "60%",
        //   height: 24,
        //   borderColor: "#000",
        //   borderWidth: 2,
        // }}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{ padding: 5, marginBottom: 40 }}
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
        itemTextStyle={{
          //text style of a single dropdown item
          color: "#222",
        }}
        itemsContainerStyle={{
          //items container style you can pass maxHeight
          //to restrict the items dropdown hieght
          // height: 104,
          // padding: 8,
          // // borderColor: "#000",
          // borderRadius: 8,
          // borderWidth: 1,
          maxHeight: "50%",
        }}
        items={items}
        //mapping of item array
        defaultIndex={0}
        //default selected item index
        placeholder="Select State"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={(item) => {
          setDistrict(item.name);
        }}
        style={{
          width: "60%",
          height: 24,
          borderColor: "#000",
          borderWidth: 2,
        }}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{ padding: 5, marginBottom: 40 }}
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
        itemTextStyle={{
          //text style of a single dropdown item
          color: "#222",
        }}
        itemsContainerStyle={{
          //items container style you can pass maxHeight
          //to restrict the items dropdown hieght
          // height: "20%",
          padding: 8,
          borderColor: "#000",
          borderRadius: 8,
          borderWidth: 1,
        }}
        items={districts}
        //mapping of item array
        // defaultIndex={0}
        // //default selected item index
        placeholder="Select District"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={(item) => alert(JSON.stringify(item))}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{ padding: 5 }}
        //suggestion container style
        textInputStyle={{
          //inserted text style
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#FAF7F6",
        }}
        itemStyle={{
          //single dropdown item style
          padding: 10,
          marginTop: 2,
          backgroundColor: "#FAF9F8",
          borderColor: "#bbb",
          borderWidth: 1,
        }}
        itemTextStyle={{
          //text style of a single dropdown item
          color: "#222",
        }}
        itemsContainerStyle={{
          //items container style you can pass maxHeight
          //to restrict the items dropdown hieght
          maxHeight: "50%",
        }}
        items={items}
        //mapping of item array
        defaultIndex={2}
        //default selected item index
        placeholder="placeholder"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />

      <TouchableOpacity
        style={{
          marginTop: 20,
          height: 46,
          width: "60%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#207502",
          borderRadius: 16,
        }}
        // disabled={true}

        onPress={() => {
          setState("");
          navigation.navigate("CropPriceDetailsScreen", {
            state: state,
            district: district,
          });
        }}
      >
        <Text style={{ fontSize: 20 }}> Crop Price</Text>
      </TouchableOpacity>
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
