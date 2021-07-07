import AsyncStorage from "@react-native-community/async-storage";
import DataContext from "./DataContext";
import axios from "axios";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "authentication":
      return { token: action.payload, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    case "user_data":
      return {
        ...state,
        username: action.username,
        date: action.date,
        image: action.image,
      };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const checkAuthentication = (dispatch) => {
  return async () => {
    await AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          dispatch({ type: "authentication", payload: token });
          navigate("Camera");
        } else {
          navigate("Register");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const signup = (dispatch) => {
  return async ({ email, username, password, retypedPassword }) => {
    try {
      if (!email || !username || !password || !retypedPassword) {
        dispatch({
          type: "add_error",
          payload: "Precisa de preencher todos os campos!",
        });
      } else if (password != retypedPassword) {
        dispatch({
          type: "add_error",
          payload: "As passwords não correspondem!",
        });
      } else {
        await axios
          .post("http://192.168.1.157:5000/signup", {
            email,
            username,
            password,
          })
          .then(async (res) => {
            await AsyncStorage.setItem("token", res.data.token);
            dispatch({ type: "authentication", payload: res.data.token });
            navigate("Camera");
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: "add_error",
              payload: "Algo correu mal com o resgisto!",
            });
          });
      }
    } catch (err) {
      dispatch({ type: "add_error", payload: "Algo correu mal" });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      if (!email || !password) {
        dispatch({
          type: "add_error",
          payload: "Precisa de preencher todos os campos!",
        });
      } else {
        await axios
          .post("http://192.168.1.157:5000/signin", {
            email,
            password,
          })
          .then(async (res) => {
            await AsyncStorage.setItem("token", res.data.token)
              .then(() => {
                dispatch({ type: "authentication", payload: res.data.token });
                navigate("Camera");
              })
              .catch((err) => {
                console.log(err);
                dispatch({
                  type: "add_error",
                  payload: "Algo correu mal com o token!",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: "add_error",
              payload: "Algo correu mal com o login!",
            });
          });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "add_error", payload: "Algo correu mal" });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token")
      .then(() => {
        dispatch({ type: "signout" });
        navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchUser = (dispatch) => {
  return async () => {
    await AsyncStorage.getItem("token")
      .then(async (token) => {
        await axios({
          method: "get",
          url: "http://192.168.1.157:5000/user",
          headers: { Authorization: `Bearer$${token}` },
        })
          .then((res) => {
            dispatch({
              type: "user_data",
              username: res.data.username,
              date: res.data.date,
              image: "http://192.168.1.157:5000/" + res.data.image,
            });
            //Este código serve apenas para o front end com comunicação para o backend na internet
            // if (res.data.image.split("_").length > 1) {
            //   console.log("boas");
            //   dispatch({
            //     type: "user_data",
            //     username: res.data.username,
            //     date: res.data.date,
            //     image:
            //       "https://naturefriend-mobile.herokuapp.com/" + res.data.image,
            //   });
            // } else {
            //   dispatch({
            //     type: "user_data",
            //     username: res.data.username,
            //     date: res.data.date,
            //     image: "https://naturefriend.herokuapp.com/" + res.data.image,
            //   });
            // }
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

const uploadUserImage = (dispatch) => {
  return async ({ formData }) => {
    await AsyncStorage.getItem("token")
      .then(async (token) => {
        const sucess = { message: true };
        try {
          await axios({
            method: "post",
            url: "http://192.168.1.157:5000/profile",
            headers: {
              Authorization: `Bearer$${token}`,
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          })
            .then(() => {
              return sucess;
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const { Provider, Context } = DataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    checkAuthentication,
    fetchUser,
    uploadUserImage,
  },
  { token: null, errorMessage: "", username: "", date: "", image: "" }
);
