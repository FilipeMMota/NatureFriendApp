import AsyncStorage from "@react-native-community/async-storage";
import DataContext from "./DataContext";
import axios from "axios";
import { navigate } from "../navigationRef";

const postsReducer = (state, action) => {
  switch (action.type) {
    case "get_posts":
      return { posts: action.posts };
    default:
      return state;
  }
};

const fetchPosts = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    const result = await axios({
      method: "get",
      url: "http://192.168.1.157:5000/posts",
      headers: { Authorization: `Bearer$${token}` },
    });
    dispatch({ type: "get_posts", posts: result.data });
  };
};

const createPost = (dispatch) => {
  return async ({ capturedPhoto, title, description, latitude, longitude }) => {
    const formData = new FormData();
    formData.append("PostPicture", {
      name: `${title.split(" ").join("")}_${description
        .substring(0, 5)
        .split(" ")
        .join("")}.jpg`,
      type: "image/jpg",
      uri:
        Platform.OS === "android"
          ? capturedPhoto
          : capturedPhoto.replace("file://", ""),
    });

    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    const token = await AsyncStorage.getItem("token");
    await axios({
      method: "post",
      url: "http://192.168.1.157:5000/posts",
      headers: {
        Authorization: `Bearer$${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      console.log("Message", res.data.message);
    });
  };
};

export const { Provider, Context } = DataContext(
  postsReducer,
  { fetchPosts, createPost },
  { posts: [] }
);
