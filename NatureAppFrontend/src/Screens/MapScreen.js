import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import MapView from "react-native-maps";

const MapScreen = () => {
  const [accessGranted, setAccessGranted] = useState(true);
  const [latitude, setLatitude] = useState(38.7223);
  const [longitude, setLongitude] = useState(9.1393);
  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        setAccessGranted(false);
      }
      setAccessGranted(true);
      const location = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (e) {}
  };

  const AlertForLocation = () =>
    Alert.alert(
      "Need location premission",
      "This application needs the permission to use your location, Please enable the location",
      [{ text: "Ok", onPress: () => startWatching() }],
      { cancelable: false }
    );

  useEffect(() => {
    startWatching();
  }, []);

  if (!accessGranted) {
    AlertForLocation();
    return <View></View>;
  }

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
