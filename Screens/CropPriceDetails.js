import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { borderRightColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
function CropPriceDetails({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [count, setCount] = React.useState(0);
  const { state, district } = route.params;

  React.useEffect(() => {
    handlFetchCropPrice(state, district);
    console.log(state + " " + district);
  }, []);
  const handlFetchCropPrice = (state, district) => {
    setData([]);
    setLoading(true);
    // console.log("Crop Price" + state + district);
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001df20ab572c9b421b5111effe484d013c&format=json&limit=500&filters[state]=${state}&filters[district]=${district}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#207502" />
      <View elevation={5} style={styles.profileView}>
        <TouchableOpacity
          style={{ marginTop: 8, marginLeft: 12, padding: 4 }}
          // onPress={() => navigation.openDrawer()}
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
            label="A"
            color="#000"
            style={{ backgroundColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 24,
          marginBottom: 12,
          margin: 16,
        }}
      >
        <View style={styles.table}>
          <Text
            style={[
              styles.tableHeaderText,
              { borderRightColor: "#fff", borderRightWidth: 1 },
            ]}
          >
            Market
          </Text>
          <Text
            style={[
              styles.tableHeaderText,
              { borderRightColor: "#fff", borderRightWidth: 1 },
            ]}
          >
            Commodity
          </Text>
          <Text
            style={[
              styles.tableHeaderText,
              { borderRightColor: "#fff", borderRightWidth: 1 },
            ]}
          >
            Mimimum Price
          </Text>
          <Text style={styles.tableHeaderText}> Maximum price </Text>
        </View>
        {loading && (
          <ActivityIndicator
            style={{ height: 120 }}
            color="#207502"
            size="large"
          />
        )}
        {data.count != 0 ? (
          <FlatList
            data={data.records}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: "#207502",
                  }}
                >
                  <Text
                    style={[
                      styles.tableDataColoumn,
                      {
                        borderLeftWidth: 1,
                        borderLeftColor: "#207502",
                      },
                    ]}
                  >
                    {item.market}
                  </Text>
                  <Text style={styles.tableDataColoumn}>{item.commodity}</Text>
                  <Text style={styles.tableDataColoumn}>{item.min_price}</Text>
                  <Text style={[styles.tableDataColoumn]}>
                    {item.max_price}
                  </Text>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileViewText: {
    color: "#fff",
    marginTop: 8,
    paddingLeft: 20,
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
});
export default CropPriceDetails;
