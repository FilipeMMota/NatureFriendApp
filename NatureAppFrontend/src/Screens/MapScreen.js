import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
    return <MapView 
        style={styles.map}
        mapType= "hybrid"
    />
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;