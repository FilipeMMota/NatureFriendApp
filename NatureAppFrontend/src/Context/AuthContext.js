import AsyncStorage from "@react-native-community/async-storage";
import DataContext from "./DataContext";
import axios from "axios";
import {navigate} from "../navigationRef";

const authReducer = (state, action) => {
    switch(action.type) {
        case "authentication":
            return{token: action.payload, errorMessage: ""};
        case "add_error":
            return{...state, errorMessage: action.payload};
        case "clear_error_message":
            return {...state, errorMessage: ""};
        case "signout":
            return {token: null, errorMessage: ""}
        default:
            return state;
    }
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: "clear_error_message"});
    };
};

const checkAuthentication = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem("token");
        if(token){
            dispatch({type: "authentication", payload: token});
            navigate("Main");
        }else{
            navigate("Register"); 
        }
    };
};

const signup = (dispatch) => {
    return async ({email, username, password, retypedPassword}) => {
        try{
            if(!email || !username || !password || !retypedPassword){
                dispatch({type:"add_error", payload:"Precisa de preencher todos os campos!"});
            }else if(password != retypedPassword){
                dispatch({type:"add_error", payload:"As passwords não correspondem!"});
            }else{
                const response = await axios.post("http://192.168.1.157:5000/signup", {email, username, password})
                await AsyncStorage.setItem("token", response.data.token);
                dispatch({type: "authentication", payload: response.data.token});
                navigate("Main");
            }
        }catch(err){
            dispatch({type:"add_error", payload:"Este email já existe!"});
        }
    };
};

const signin = (dispatch) => {
    return async ({email, password}) => {
        try{
            if(!email || !password){
                dispatch({type:"add_error", payload:"Precisa de preencher todos os campos!"});
            }else{
                const response = await axios.post("http://192.168.1.157:5000/signin", {email, password})
                await AsyncStorage.setItem("token", response.data.token);
                dispatch({type: "authentication", payload: response.data.token});
                navigate("Main");
            }
            
        }catch(err){
            console.log(err);
            dispatch({type:"add_error", payload:"Algo correu mal com o login!"});
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem("token");
        dispatch({type: "signout"});
        navigate("Login");  
    };
};

export const {Provider, Context} = DataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, checkAuthentication},
    {token: null, errorMessage: ""}
);