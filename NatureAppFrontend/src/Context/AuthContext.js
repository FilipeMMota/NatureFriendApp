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
      return { ...state, username: action.username, date: action.date };
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
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "authentication", payload: token });
      navigate("Camera");
    } else {
      navigate("Register");
    }
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
        const response = await axios.post("http://192.168.1.157:5000/signup", {
          email,
          username,
          password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "authentication", payload: response.data.token });
        navigate("Camera");
      }
    } catch (err) {
      dispatch({ type: "add_error", payload: "Este email já existe!" });
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
        const response = await axios.post("http://192.168.1.157:5000/signin", {
          email,
          password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "authentication", payload: response.data.token });
        navigate("Camera");
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "add_error", payload: "Algo correu mal com o login!" });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("Login");
  };
};

const fetchUser = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: "http://192.168.1.157:5000/user",
      headers: { Authorization: `Bearer$${token}` },
    });
    dispatch({
      type: "user_data",
      username: response.data.username,
      date: response.data.date,
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
  },
  { token: null, errorMessage: "", username: "", date: "" }
);
