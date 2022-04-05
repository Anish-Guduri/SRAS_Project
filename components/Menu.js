import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
function Menu({ OnPress }) {
  return (
    <TouchableOpacity
      style={{ flex: 1, marginTop: 8, marginLeft: 12, padding: 4 }}
      onPress={OnPress}
    >
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: 26,
    height: 3,
    borderRadius: 24,
    marginBottom: 3,
    backgroundColor: "#fff",
  },
});

export default Menu;
