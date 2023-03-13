import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

import GoBackBtn from "./components/GoBackBtn";
import HomeScreen from "./Screens/main/HomeScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",

          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.4,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 58,
          paddingTop: 9,
          paddingBottom: 22,
          height: 71,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          height: 40,
          marginHorizontal: 8,
        },
        tabBarActiveTintColor: "#212121cc",
        tabBarInactiveTintColor: "#212121cc",
        // tabBarActiveBackgroundColor: "#FF6C00",
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        options={{
          headerLeft: () => <GoBackBtn />,
          tabBarStyle: { display: "none" },
          tabBarItemStyle: {
            backgroundColor: "#FF6C00",
            borderRadius: 20,
          },
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="add-outline" size={24} color={"#ffffff"} />
          ),
        }}
        name="Create post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-person-outline" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
