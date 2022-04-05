import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

const CropList = ({ crops, crop, setCrop, cropToggle, setCropToggle }) => {
  if (crop) {
    const filteredList = crops.filter((item) =>
      item.toString().toLowerCase().startsWith(crop.toLowerCase())
    );
    if (filteredList.length) {
      return (
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropDownItems}
              onPress={() => {
                setCrop(item);
                setCropToggle(!cropToggle);
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
    <FlatList
      data={crops}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.dropDownItems}
          onPress={() => {
            setCrop(item);
            setCropToggle(!cropToggle);
          }}
        >
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
const styles = StyleSheet.create({
  dropDownItems: {
    padding: 4,
    fontSize: 18,
  },
});
export default CropList;
