import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./Screens/WelcomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import SplashScreen from "./Screens/SplashScreen";
import HomeScreen from "./Screens/HomeScreen";
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen";
import EditProfile from "./Screens/EditProfile";
import BookYourSlot from "./Screens/BookYourSlot";
import SoilAnalysis from "./Screens/SoilAnalysis";
import CropPrice from "./Screens/CropPrice";
import CropPriceDetails from "./Screens/CropPriceDetails";
import "react-native-gesture-handler";
import DrawerContent from "./Screens/DrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="EditProfileScreen"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BookYourSlotScreen"
        component={BookYourSlot}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="SoilAnalysisScreen"
        component={SoilAnalysis}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CropPriceScreen"
        component={CropPrice}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookYourSlotScreen"
          component={BookYourSlot}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SoilAnalysisScreen"
          component={SoilAnalysis}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CropPriceScreen"
          component={CropPrice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CropPriceDetailsScreen"
          component={CropPriceDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
