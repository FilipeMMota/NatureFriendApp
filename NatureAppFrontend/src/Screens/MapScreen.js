import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Accuracy, getCurrentPositionAsync } from "expo-location";
import MapView from "react-native-maps";

const MapScreen = () => {
  const [latitude, setLatitude] = useState(38.7223);
  const [longitude, setLongitude] = useState(9.1393);

  const getCurrentPosition = async () => {
    try {
      const location = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (e) {}
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        mapType="hybrid"
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  errorText: {
    fontSize: 33,
    paddingTop: 60,
  },
  button: {
    marginTop: 100,
  },
});

export default MapScreen;
