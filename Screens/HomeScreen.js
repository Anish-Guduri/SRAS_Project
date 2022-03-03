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
  ImageBackground,
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
  let priceCrop = "  ";
  const handlFetchCropPrice = (state, district, commodity) => {
    console.log("Crop Price");
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001df20ab572c9b421b5111effe484d013c&format=json&limit=500&filters[state]=${state}&filters[district]=${district}&filters[commodity]=${commodity}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(data.records[0].market);
        // console.log(JSON.stringify(data));
        priceCrop = data.records[0].market;
        // setTemp(JSON.stringify(data.current.temp));
        // console.log(data.current.sunrise);
      });
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.replace("Welcome")}>
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
      </TouchableOpacity> */}

      <StatusBar animated={true} backgroundColor="#207502" />
      <View style={styles.profileView}>
        <Text style={styles.profileViewText}>Latitude: {text}</Text>
        <Text style={styles.profileViewText}>Longitude: {longitude}</Text>
        <Text style={styles.profileViewText}>Temperature: {temp} &deg;C</Text>
      </View>
      <View elevation={5} style={styles.WeatherInfoCard}>
        <View style={styles.WeatherInfoCardpartHorizontal}>
          <View style={styles.WeatherInfoCardpartVerical1}>
            <ImageBackground
              source={require("../assets/vecteezy_sun-smiling-weather-icon-on-white-background_.jpg")}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            >
              <Text style={styles.WeatherHeading}>Temp:</Text>
              <Text style={styles.WeatherTextValue}>{temp} &deg;C</Text>
            </ImageBackground>
          </View>

          <View style={styles.WeatherInfoCardpartVerical2}>
            <ImageBackground
              source={require("../assets/vecteezy_sunny-day-and-clouds-cartoon-illustration-sun-and-cloud_5835172.png")}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            >
              <Text style={styles.WeatherHeading}>Rain:</Text>
              <Text style={styles.WeatherTextValue}>{rain}</Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.WeatherInfoCardpartHorizontal}>
          <View style={styles.WeatherInfoCardpartVerical3}>
            <Text style={styles.WeatherHeading}>Humidity </Text>
            <Text style={styles.WeatherTextValue}>{humidity}</Text>
          </View>

          <View style={styles.WeatherInfoCardpartVerical4}>
            <Text style={styles.WeatherHeading}>Wind Speed</Text>
            <Text
              style={{
                paddingTop: 8,
                paddingRight: 16,
                fontSize: 20,
                textAlign: "right",
                color: "#000",
              }}
            >
              {windSpeed} km/hr
            </Text>
            <Text
              style={{
                paddingTop: 8,
                paddingRight: 16,
                fontSize: 16,
                textAlign: "right",
                color: "#000",
              }}
            >
              {windDirection}
            </Text>
          </View>
        </View>
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
      <View
        elevation={5}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          position: "absolute",
          top: "92%",
          height: "8.5%",
          width: "100%",
          backgroundColor: "#207502",
          justifyContent: "flex-end",
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileView: {
    // flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 16,
    width: "100%",
    height: "24%",
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
    padding: 8,
  },
  WeatherInfoCardpartHorizontal: {
    flex: 2,
    flexDirection: "row",
    // marginLeft: 20,
    // paddingRight: 20,
    // borderBottomWidth: 2,
    // borderRightWidth: 2,
    // borderBottomColor: "#fff",
    // borderRightColor: "#fff",
  },
  WeatherInfoCardpartVerical1: {
    flex: 2,
    // borderBottomWidth: 2,
    // borderBottomColor: "#fff",
    borderTopLeftRadius: 40,
    // backgroundColor: "#149",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  WeatherInfoCardpartVerical2: {
    flex: 2,
    borderTopRightRadius: 40,
    // backgroundColor: "#3ee",
    borderLeftWidth: 1,
    borderLeftColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    // borderBottomWidth: 2,
    // borderBottomColor: "#fff",
  },
  WeatherInfoCardpartVerical3: {
    flex: 2,
    // backgroundColor: "#4a3",
    borderBottomLeftRadius: 40,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#000",
    // borderRightWidth: 2,
    // borderRightColor: "#fff",
    // marginBottom: 20,
  },
  WeatherInfoCardpartVerical4: {
    flex: 2,
    // backgroundColor: "#91F",
    borderBottomRightRadius: 40,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  WeatherHeading: {
    color: "#000",
    marginTop: 8,
    paddingLeft: 12,
    fontSize: 20,
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
