import React, { useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as PostsContext } from "../Context/PostsContext";
import { AntDesign } from "@expo/vector-icons";
import Moment from "moment"; // Usado para formatar a data recebida da base de dados
import Posts from "../Components/Posts";

const UserScreen = function ({ navigation }) {
  const { state: authState, signout, fetchUser } = useContext(AuthContext);
  const { state: postsState, fetchPosts } = useContext(PostsContext);
  const posts = postsState.posts;

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const AlertSignOut = () =>
    Alert.alert(
      "Sair",
      "Tem a certeza que pretende sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Sim", onPress: () => signout() },
      ],
      { cancelable: false }
    );
  return (
    <View style={styles.Content}>
      <View>
        <View style={styles.ProfilePicture}>
          <View style={styles.icon}>
            <TouchableOpacity>
              <AntDesign name="pluscircle" color={"#19456b"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.Username}>{authState.username}</Text>
      <Text style={styles.RegisteredDate}>
        Registado desde {Moment(authState.date).format("DD/MM/YYYY")}
      </Text>

      <Text style={styles.Text}>Os meus posts</Text>

      <View style={styles.Posts}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(posts) => posts.post_title}
          data={posts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                <Posts
                  PostTitle={item.post_title}
                  Descrição={item.post_description}
                  Data={Moment(item.post_date).format("DD/MM/YYYY")}
                ></Posts>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.SignOut} onPress={() => AlertSignOut()}>
        <Text style={styles.TextSignOut}>Sair</Text>
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
  icon: {
    paddingTop: 78,
    paddingLeft: 88,
  },
  ProfilePicture: {
    width: 110,
    height: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    marginTop: hp("6%"),
  },
  Username: {
    fontSize: hp("4.2%"),
    fontWeight: "bold",
  },
  RegisteredDate: {
    fontSize: hp("1.8%"),
    opacity: 0.5,
  },
  Text: {
    fontSize: hp("3.5%"),
    marginTop: hp("3%"),
    alignSelf: "flex-start",
    paddingLeft: wp("15%"),
  },
  Posts: {
    width: wp("80%"),
    height: hp("45%"),
    justifyContent: "space-around",
    borderRadius: 100,
    alignItems: "center",
  },
  SignOut: {
    backgroundColor: "#19456b",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: hp("2%"),
    elevation: 9,
    height: 40,
    width: 135,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  TextSignOut: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default UserScreen;
