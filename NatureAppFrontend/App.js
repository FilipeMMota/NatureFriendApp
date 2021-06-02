import React from "react";
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import CameraScreen from "./src/Screens/CameraScreen";
import MapScreen from "./src/Screens/MapScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import UserScreen from "./src/Screens/UserScreen";
import PostsScreen from "./src/Screens/PostsScreen";
import {Provider as AuthProvider} from "./src/Context/AuthContext";
import {Provider as PostsProvider} from "./src/Context/PostsContext";
import {navigationRef, setNavigator} from "./src/navigationRef";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {FontAwesome5} from "@expo/vector-icons";




const navigator = createSwitchNavigator({
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
  appFlow: createMaterialBottomTabNavigator({
    Camera: { screen: CameraScreen,  
      navigationOptions:{  
        tabBarLabel:'Camera',
        tabBarIcon:({tintColor})=>(<Entypo name="camera" color={tintColor} size={25}/>)  
      }    
    },
    Map: { screen: MapScreen,  
      navigationOptions:{  
          tabBarLabel:'Map',
          tabBarIcon:({tintColor})=>(<FontAwesome5 name="map-marker-alt" color={tintColor} size={25}/>) 
      }
    },
    userFlow: createStackNavigator({
      User: {
        screen: UserScreen,
        navigationOptions:{
          headerShown: false,
        }
      },
      Posts: PostsScreen
    },{
      navigationOptions:{
        tabBarLabel:'User',
        tabBarIcon:({tintColor})=>(<FontAwesome name="user" color={tintColor} size={25}/>) 
      }
    })
  }, {  
    initialRouteName: "Camera",  
    activeColor: "#ffffff",  
    inactiveColor: "#19456b",  
    barStyle: { backgroundColor: "#70af85", height: 50},
  })
});

const App = createAppContainer(navigator);

export default () => {// Dentro do app component, que é onde contém as propriedades de navegação entre screens, estamos a chamar a funão setNavigator para receber essas propriedades 
  return(
    <PostsProvider>
      <AuthProvider> 
        <App ref={(navigator) => {setNavigator(navigator)}}/> 
      </AuthProvider>
    </PostsProvider>
    
  );
}