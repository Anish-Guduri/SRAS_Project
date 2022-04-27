import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
function Menu({ OnPress, screenName }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ flex: 1, marginTop: 8, marginLeft: 12, padding: 8 }}
        onPress={OnPress}
      >
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 4,
          marginLeft: 46,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color: "white",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {screenName}
      </Text>
    </View>
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
