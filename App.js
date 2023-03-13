import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Main from "./components/Main";

import { Provider } from "react-redux";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "Warning: Async Storage has been extracted from react-native core",
    ]);
  }, []);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
});
