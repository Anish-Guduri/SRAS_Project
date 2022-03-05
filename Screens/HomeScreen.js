import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import moment from "moment-timezone";
import { authentication } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { Ionicons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

function HomeScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [temp, setTemp] = React.useState("--");
  const [humidity, setHumidity] = React.useState("--");
  const [windSpeed, setWindSpeed] = React.useState("--");
  const [windDirection, setWindDirection] = React.useState("--");
  const [rain, setRain] = React.useState("--");
  // const [data, setData] = React.useState({});
  // const [price, setPrice] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
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
  }, []);

  function handlLogOut() {
    signOut(authentication).catch((error) => {
      Alert.alert(error.message);
    });
  }
  let text = "Waiting...";
  let longitude = "Waiting...";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude);
    longitude = JSON.stringify(location.coords.longitude);
  }
  let apiKey = "a766553fb96265daea1f178f66eed316";
  const fetchWeatherApiData = (latitude, longitude) => {
    console.log(latitude + " " + longitude);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(JSON.stringify(data));
        let windDegree = JSON.stringify(data.current.wind_deg);
        setTemp(JSON.stringify(data.current.temp));
        setRain(JSON.stringify(data.current.weather[0].main));
        setHumidity(JSON.stringify(data.current.humidity));
        setWindSpeed(JSON.stringify(data.current.wind_speed));

        if (windDegree >= 0 && windDegree <= 11.25) setWindDirection("N");
        else if (windDegree <= 56.25 && windDegree > 11.25)
          setWindDirection("NE");
        else if (windDegree <= 123.75 && windDegree > 56.25)
          setWindDirection("E");
        else if (windDegree <= 168.75 && windDegree > 123.75)
          setWindDirection("SE");
        else if (windDegree <= 191.75 && windDegree > 146.25)
          setWindDirection("S");
        else if (windDegree <= 191.25 && windDegree > 236.25)
          setWindDirection("SW");
        else if (windDegree > 236.25 && windDegree <= 303.25)
          setWindDirection("W");
        else if (windDegree > 303.25 && windDegree <= 348.75)
          setWindDirection("NW");
        else setWindDirection("N");
        // console.log(data.current.sunrise);
      });
  };
  // let priceCrop = "  ";
  // const handlFetchCropPrice = (state, district, commodity) => {
  //   console.log("Crop Price");
  //   const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001df20ab572c9b421b5111effe484d013c&format=json&limit=500&filters[state]=${state}&filters[district]=${district}&filters[commodity]=${commodity}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       Alert.alert(data.records[0].market);
  //       // console.log(JSON.stringify(data));
  //       priceCrop = data.records[0].market;
  //       // setTemp(JSON.stringify(data.current.temp));
  //       // console.log(data.current.sunrise);
  //     });
  // };

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
      <View elevation={5} style={styles.WeatherInfoCard}>
        <ImageBackground
          source={require("../assets/WeatherBackground.png")}
          style={{ width: "100%", height: "100%" }}
          imageStyle={{ borderRadius: 40 }}
        >
          <View style={styles.weatherItem}>
            <Image
              source={require("../assets/temperatureIcon.png")}
              style={styles.weatherIcon}
            />
            <Text style={styles.WeatherTextValue}>{temp} &deg;C</Text>
          </View>

          <View style={styles.weatherItem}>
            {/* <Text style={styles.WeatherHeading}>Rain:</Text> */}
            <Image
              source={require("../assets/WeatherIcon.png")}
              style={styles.weatherIcon}
            />
            <Text style={styles.WeatherTextValue}>{rain}</Text>
          </View>

          <View style={styles.weatherItem}>
            <Image
              source={require("../assets/humidityIcon.png")}
              style={styles.weatherIcon}
            />
            {/* <Text style={styles.WeatherHeading}>Humidity </Text> */}
            <Text style={styles.WeatherTextValue}>{humidity}</Text>
          </View>

          <View style={styles.weatherItem}>
            <Image
              source={require("../assets/windIcon.png")}
              style={styles.weatherIcon}
            />
            {/* <Text style={styles.WeatherHeading}>Wind Speed</Text> */}
            <Text style={styles.WeatherTextValue}>{windSpeed} km/hr</Text>
            <Text style={[styles.WeatherTextValue, { marginLeft: 28 }]}>
              {windDirection}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* <View
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
        </View> */}
      {/* <TouchableOpacity
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
            handlFetchCropPrice("Maharashtra", "Nagpur", "Beetroot");
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
            Crop Price
          </Text>
        </TouchableOpacity> */}

      <TouchableOpacity
        elevation={2}
        style={{
          height: "8%",
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "88%",
          backgroundColor: "#207502",
          borderRadius: 16,
        }}
        onPress={() => navigation.navigate("SoilAnalysisScreen")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Check your Soil Analysis
        </Text>
      </TouchableOpacity>
      <View
        elevation={5}
        style={{
          height: "8%",
          width: "100%",
          backgroundColor: "#207502",
          borderTopRightRadius: 4,
          borderTopLeftRadius: 4,
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileView: {
    flexDirection: "row",
    width: "100%",
    height: "24%",
    paddingTop: 16,
    paddingLeft: 16,
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  profileViewText: {
    color: "#fff",
    marginTop: 8,
    paddingLeft: 20,
  },
  WeatherInfoCard: {
    width: "88%",
    height: "44%",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    top: 108,
    backgroundColor: "#fff",
    borderRadius: 40,
    // padding: 8,
  },
  weatherIcon: {
    height: 34,
    width: 34,
    marginLeft: 24,
    marginTop: 16,
    marginRight: 48,
  },
  weatherItem: {
    flex: 4,
    flexDirection: "row",
  },

  WeatherTextValue: {
    paddingTop: 8,
    paddingRight: 16,
    fontSize: 24,
    textAlign: "right",
    color: "black",
  },
});
export default HomeScreen;
