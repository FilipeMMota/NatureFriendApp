import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Context as PostsContext } from "../Context/PostsContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PostsScreen = function ({ navigation }) {
  const { deletePost } = useContext(PostsContext);
  const id = navigation.getParam("id");
  const title = navigation.getParam("title");
  const description = navigation.getParam("description");
  const date = navigation.getParam("date");
  const postImage = navigation.getParam("postImage");

  const AlertDeletePost = () =>
    Alert.alert(
      "Problema resolvido?",
      'Ao clicar em "Sim" esta publicação será apagada!\nTem a certeza que o problema está resolvido? ',
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Sim", onPress: () => deletePost({ id }) },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.Content}>
      <View>
        <Image
          source={{ uri: "http://192.168.1.157:5000/" + `${postImage}` }}
          style={{
            height: 200,
            width: 300,
            borderRadius: 20,
            marginTop: 60,
            alignSelf: "center",
          }}
        />
        <Text style={styles.Titulo}>{title}</Text>
        <Text style={styles.Data}>{date}</Text>
        <View style={styles.DescriptionField}>
          {description ? (
            <Text style={styles.Description}>{description}</Text>
          ) : (
            <Text style={styles.Description}>
              Esta publicação não tem descrição
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.SolvedButton}
        onPress={() => AlertDeletePost()}
      >
        <Text style={styles.Text}>Problema resolvido!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    backgroundColor: "#f1f3f8",
    alignItems: "center",
  },

  Titulo: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  Data: {
    fontSize: 13,
    alignSelf: "center",
    opacity: 0.5,
  },
  Description: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10,
  },
  DescriptionField: {
    width: wp("85%"),
    height: hp("33%"),
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "gray",
  },
  SolvedButton: {
    backgroundColor: "#19456b",
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 0,
    marginTop: 20,
    elevation: 9,
    height: 40,
    width: 135,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PostsScreen;
