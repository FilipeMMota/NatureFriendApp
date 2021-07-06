import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Alert, Modal, Text, Image } from "react-native";
import { Context as PostsContext } from "../Context/PostsContext";
import { Accuracy, getCurrentPositionAsync } from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { NavigationEvents } from "react-navigation";
import { heightPercentageToDP } from "react-native-responsive-screen";

const MapScreen = () => {
  const [latitude, setLatitude] = useState(38.7223);
  const [longitude, setLongitude] = useState(-9.1393);
  const { state, fetchAllPosts } = useContext(PostsContext);

  const posts = state.allPosts;

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
    fetchAllPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => {
          fetchAllPosts();
        }}
      />
      <MapView
        style={styles.map}
        mapType="hybrid"
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      >
        {posts &&
          posts.map((marker) => (
            <Marker
              key={marker.post_id}
              coordinate={{
                latitude: marker.post_lat,
                longitude: marker.post_lng,
              }}
              title={marker.title}
              image={require("../../assets/MarkerIcon.png")}
            >
              <Callout>
                <View style={{ padding: 50, borderRadius: 30 }}>
                  <View>
                    <Text>
                      <Image
                        source={{
                          uri: "http://192.168.1.157:5000/" + marker.post_img,
                        }}
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                      />
                    </Text>
                  </View>
                  <Text>{marker.post_title}</Text>
                  <Text>{marker.post_description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
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
