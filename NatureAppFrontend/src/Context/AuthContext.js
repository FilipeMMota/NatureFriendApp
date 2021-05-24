import DataContext from "./DataContext";
import axios from "axios";

const authReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({email, username, password}) => {
        try{
            const response = await axios.post("http://192.168.1.157:5000/signup", {email, username, password})
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    };
};

const signin = (dispatch) => {
    return ({email, password}) => {

    };
};

const signout = (dispatch) => {
    return () => {

    };
};

export const {Provider, Context} = DataContext(
    authReducer,
    {signup, signin, signout},
    {isSignedIn: false}
);