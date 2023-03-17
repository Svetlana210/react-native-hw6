import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { location, locality } = route.params;
  // console.log(locality);
  const { longitude, latitude } = location;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude,
          latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker title={locality} coordinate={{ longitude, latitude }} />
      </MapView>
    </View>
  );
};

export default MapScreen;
