import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Context as AuthContext } from "../Context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = function () {
  const { checkAuthentication } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      checkAuthentication();
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={["#70af85", "#19456b"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        style={styles.icon}
        source={require("../../assets/NatureFriendLogo.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon: {
    height: 230,
    width: 350,
  },
});

export default LoadingScreen;
