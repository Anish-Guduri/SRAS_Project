import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { DrawerActions } from "@react-navigation/native";

function BookYourSlot({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 8,
          marginLeft: 12,
          backgroundColor: "#207502",
          height: 40,
          width: 56,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          Alert.alert("Menu is Clicked");
          navigation.dispatch(DrawerActions.openDrawer());
        }}
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
      <Text>Book Your Slot Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "space-between",
  },
});
export default BookYourSlot;
