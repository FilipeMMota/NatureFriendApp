import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Posts = function ({ PostTitle, Descrição, Data, postImage }) {
  return (
    <View style={styles.Individual}>
      <Image
        source={{ uri: "http://192.168.1.157:5000/" + postImage }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          position: "absolute",
          top: hp("2%"),
          left: wp("5%"),
        }}
      />
      <Text style={styles.Titulo}>{PostTitle}</Text>
      <Text style={styles.Descricao}>{Descrição}</Text>
      <Text style={styles.Data}>Criado a {Data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Individual: {
    width: wp("75%"),
    height: hp("11.5%"),
    backgroundColor: "#70af85",
    borderRadius: 25,
    marginBottom: hp("4%"),
    elevation: 7,
  },

  Titulo: {
    fontSize: hp("2%"),
    alignSelf: "center",
    marginLeft: wp("10%"),
    marginTop: hp("1%"),
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  Descricao: {
    fontSize: hp("1.5%"),
    alignSelf: "center",
    marginLeft: wp("12%"),
    color: "#FFFFFF",
    opacity: 0.5,
  },

  Data: {
    fontSize: hp("1.5%"),
    alignSelf: "center",
    marginLeft: wp("40%"),
    marginTop: hp("2.5%"),
    color: "#FFFFFF",
    opacity: 0.5,
  },
});

export default Posts;
