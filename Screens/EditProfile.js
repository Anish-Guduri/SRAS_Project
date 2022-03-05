import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";

function EditProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 16,
          marginLeft: 20,
          marginBottom: 20,
          padding: 10,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <View
          style={{
            width: 26,
            height: 3,
            borderRadius: 24,
            marginBottom: 3,
            backgroundColor: "#888",
          }}
        ></View>
        <View
          style={{
            width: 26,
            height: 3,
            borderRadius: 24,
            marginBottom: 3,
            backgroundColor: "#888",
          }}
        ></View>
        <View
          style={{
            width: 26,
            height: 3,
            borderRadius: 24,
            marginBottom: 3,
            backgroundColor: "#888",
          }}
        ></View>
      </TouchableOpacity>
      <Text style={{ textAlign: "center" }}>Edit Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
});
export default EditProfile;
