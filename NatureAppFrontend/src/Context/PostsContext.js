import AsyncStorage from "@react-native-community/async-storage";
import DataContext from "./DataContext";
import axios from "axios";
import { navigate } from "../navigationRef";

const postsReducer = (state, action) => {
  switch (action.type) {
    case "get_user_posts":
      return { userPosts: action.userPosts };
    case "get_all_posts":
      return { allPosts: action.allPosts };
    default:
      return state;
  }
};

const fetchUserPosts = (dispatch) => {
  return async () => {
    await AsyncStorage.getItem("token")
      .then(async (token) => {
        await axios({
          method: "get",
          url: "http://192.168.1.157:5000/userPosts",
          headers: { Authorization: `Bearer$${token}` },
        })
          .then((response) => {
            dispatch({ type: "get_user_posts", userPosts: response.data });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchAllPosts = (dispatch) => {
  return async () => {
    await AsyncStorage.getItem("token")
      .then(async (token) => {
        await axios({
          method: "get",
          url: "http://192.168.1.157:5000/allPosts",
          headers: { Authorization: `Bearer$${token}` },
        })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: "get_all_posts", allPosts: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

    await AsyncStorage.getItem("token")
      .then(async (token) => {
        await axios({
          method: "post",
          url: "http://192.168.1.157:5000/posts",
          headers: {
            Authorization: `Bearer$${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
          .then((res) => {
            console.log("Message", res.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deletePost = () => {
  return async ({ id }) => {
    await AsyncStorage.getItem("token")
      .then(async (token) => {
        await axios({
          method: "delete",
          url: "http://192.168.1.157:5000/posts",
          headers: {
            Authorization: `Bearer$${token}`,
          },
          data: { id },
        })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const { Provider, Context } = DataContext(
  postsReducer,
  { fetchUserPosts, createPost, fetchAllPosts, deletePost },
  { userPosts: [], allPosts: [] }
);
