import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import moment from "moment-timezone";
import { authentication } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
function HomeScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [temp, setTemp] = React.useState("--");
  const [data, setData] = React.useState({});
  const [price, setPrice] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
        // ...
      } else {
        navigation.navigate("Login");
      }
    });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchWeatherApiData(location.coords.latitude, location.coords.longitude);
    })();

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function handlLogOut() {
    signOut(authentication).catch((error) => {
      Alert.alert(error.message);
    });
  }
  let time = "Waiting...";
  let text = "Waiting...";
  let longitude = "Waiting...";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // let locationJson = location.latitude;
    // let locationJson = Object.entries(location);
    // console.log(locationJson.latitude);
    // console.log(location);
    text = JSON.stringify(location.coords.latitude);
    longitude = JSON.stringify(location.coords.longitude);
  }
  let apiKey = "a766553fb96265daea1f178f66eed316";
  const fetchWeatherApiData = (latitude, longitude) => {
    // console.log(latitude + " " + longitude);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(JSON.stringify(data));
        setData(data);
        setTemp(JSON.stringify(data.current.temp));
        // console.log(data.current.sunrise);
      });
  };
  let priceCrop = "  ";
  const handlFetchCropPrice = (state, district, commodity) => {
    console.log("Crop Price");
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001df20ab572c9b421b5111effe484d013c&format=json&limit=500&filters[state]=${state}&filters[district]=${district}&filters[commodity]=${commodity}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(data.records[2].market);
        console.log(JSON.stringify(data));
        priceCrop = data.records[0].market;
        // setTemp(JSON.stringify(data.current.temp));
        // console.log(data.current.sunrise);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace("Welcome")}>
        <Text>Screen {email} </Text>
        <Text>Screen {name} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#207502",
          marginTop: 20,
          borderRadius: 16,
          height: 46,
          width: 204,
        }}
        onPress={() => {
          handlLogOut();
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Logout
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 28 }}>
        <Text style={{ marginTop: 8 }}>Latitude: {text}</Text>
        <Text style={{ marginTop: 8 }}>Longitude: {longitude}</Text>
        <Text style={{ marginTop: 8 }}>Temperature: {temp} &deg;C</Text>
        <View
          style={{
            width: 255,
            marginTop: 20,
            borderColor: "#000",
            borderTopWidth: 2,
          }}
        >
          <Text style={{ marginTop: 8 }}>Crop Name {priceCrop}</Text>
          <Text style={{ marginTop: 8 }}>Minimum Price: {}</Text>
          <Text style={{ marginTop: 8 }}>Maximum Price: {} &deg;C</Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#207502",
            marginTop: 20,
            borderRadius: 16,
            height: 46,
            width: 204,
          }}
          onPress={() => {
            handlFetchCropPrice("Telangana", "Karimnagar", "Cotton");
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
            Crop Price
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
export default HomeScreen;
