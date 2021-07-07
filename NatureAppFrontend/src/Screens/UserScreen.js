import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as PostsContext } from "../Context/PostsContext";
import { AntDesign } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import Moment from "moment"; // Usado para formatar a data recebida da base de dados
import Posts from "../Components/Posts";
import * as ImagePicker from "expo-image-picker";

const UserScreen = function ({ navigation }) {
  const {
    state: authState,
    signout,
    fetchUser,
    uploadUserImage,
  } = useContext(AuthContext);
  const { state: postsState, fetchUserPosts } = useContext(PostsContext);
  const [triggerReload, settriggerReload] = useState(null);
  const posts = postsState.userPosts;

  useEffect(() => {
    fetchUser();
  }, [triggerReload]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = result;
      const formData = new FormData();
      formData.append("profilePicture", {
        name: `${authState.username}.jpg"`,
        type: "image/jpg",
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
      });
      uploadUserImage({ formData }).then(() => {
        settriggerReload(triggerReload + 1);
      });
    }
  };

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
      <NavigationEvents
        onWillFocus={() => {
          fetchUserPosts();
        }}
      />
      <View>
        <View style={styles.ProfilePicture}>
          {authState.image && (
            <Image
              source={{ uri: authState.image }}
              style={{ width: 110, height: 110, borderRadius: 100 }}
            />
          )}
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => pickImage()}>
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
          keyExtractor={(posts) => posts.post_id.toString()}
          data={posts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Posts", {
                    id: item.post_id,
                    title: item.post_title,
                    description: item.post_description,
                    date: Moment(item.post_date).format("DD/MM/YYYY"),
                    postImage: item.post_img,
                  })
                }
              >
                <Posts
                  PostTitle={item.post_title}
                  Descrição={item.post_description}
                  Data={Moment(item.post_date).format("DD/MM/YYYY")}
                  postImage={item.post_img}
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
    position: "absolute",
    top: 85,
    left: 85,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#FFFFFF",
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
