import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../nests/PostsScreen";
import MapScreen from "../nests/MapScreen";
import CommentsScreen from "../nests/CommentsScreen";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import db from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedStack = createNativeStackNavigator();

const HomeScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => [dispatch(authSignOutUser())];
  return (
    <NestedStack.Navigator
    // initialRouteName={PostsScreen}
    // screenOptions={{
    //   headerTitleAlign: "center",
    //   headerTitleStyle: {
    //     fontFamily: "Roboto-Bold",
    //     fontSize: 17,
    //     lineHight: 22,
    //     letterSpacing: -0.4,
    //   },
    // }}
    >
      <NestedStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerStyle: { height: 70 },
          headerRight: () => (
            <TouchableOpacity style={{ width: 24, marginRight: 16 }}>
              <MaterialIcons
                name="logout"
                size={24}
                color={"#BDBDBD"}
                onPress={signOut}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen name="Map" component={MapScreen} options={{}} />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{}}
      />
    </NestedStack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
