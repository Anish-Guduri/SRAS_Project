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
function CropPriceDetails({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
        // console.log(data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <View>
      <Text>CropPriceDetails</Text>
      <Text>itemId: {state}</Text>
      <Text>itemId: {district}</Text>

      {loading && (
        <ActivityIndicator style={{ height: 80 }} color="#C00" size="large" />
      )}
      <FlatList
        data={data.records}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 36, marginTop: 24 }}>
            <Text>
              {item.market +
                ". " +
                item.commodity +
                ". " +
                item.min_price +
                ". " +
                item.max_price}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
export default CropPriceDetails;
