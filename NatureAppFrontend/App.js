import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import MainScreen from "./src/Screens/MainScreen";
import MapScreen from "./src/Screens/MapScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import UserScreen from "./src/Screens/UserScreen";
import PostsScreen from "./src/Screens/PostsScreen";
import {Provider as AuthProvider} from "./src/Context/AuthContext";


const navigator = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions:{
      headerShown: false,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      headerShown: false,
    }
  },
  Main: MainScreen,
  Map: MapScreen,
  Posts: PostsScreen,
  User: {
    screen: UserScreen,
    navigationOptions:{
      headerShown: false,
    }
  }
}, {
  initialRoutName: "Register",
  defaultNavigationOptions: {
    title: "Nature Friend"
  }
});

const App = createAppContainer(navigator);

export default () => {
  return(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}