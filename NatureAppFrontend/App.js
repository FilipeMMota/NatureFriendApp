import React from "react";
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import MainScreen from "./src/Screens/MainScreen";
import MapScreen from "./src/Screens/MapScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import UserScreen from "./src/Screens/UserScreen";
import PostsScreen from "./src/Screens/PostsScreen";
import {Provider as AuthProvider} from "./src/Context/AuthContext";
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
    Main: { screen: MainScreen,  
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
    initialRouteName: "Main",  
    activeColor: "#ffffff",  
    inactiveColor: "#011936",  
    barStyle: { backgroundColor: "#018565", height: 50},  
  })
});

const App = createAppContainer(navigator);

export default () => {// Dentro do app component, que é onde contém as propriedades de navegação entre screens, estamos a chamar a funão setNavigator para receber essas propriedades 
  return(
    <AuthProvider> 
      <App ref={(navigator) => {setNavigator(navigator)}}/> 
    </AuthProvider>
  );
}