import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
let districtsOfState;

const DistrictList = ({
  districts,
  setDistrict,
  indexOfState,
  toggle,
  district,
  setToggle,
}) => {
  let districtsOfState = districts[indexOfState];

  if (district) {
    const filteredList = districtsOfState.filter((item) => {
      return item.toString().toLowerCase().startsWith(district.toLowerCase());
    });
    if (filteredList.length) {
      return (
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropDownItems}
              onPress={() => {
                setDistrict(item);
                setToggle(!toggle);
              }}
            >
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      );
    }
    return <Text>Not Found</Text>;
  }

  return (
    <View style={styles.dropDownItems}>
      <FlatList
        data={districtsOfState}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropDownItems}
            onPress={() => {
              setDistrict(item);
              setToggle(!toggle);
            }}
          >
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dropDownItems: {
    padding: 4,
    fontSize: 15,
    // height: 24,
  },
});
export default DistrictList;
