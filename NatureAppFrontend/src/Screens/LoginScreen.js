import React, {useState, useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import AuthNavigation from "../Components/AuthNavigation";
import {Context as AuthContext} from "../Context/AuthContext";

const LoginScreen = function () {
    const {state, signin} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.Content}>
            <Image style={styles.icon} source={require('../../assets/IconNature.png')} />
            <Text style={styles.title}>Nature Friend</Text>

            <TextInput style={styles.labels} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false}/>
            <TextInput secureTextEntry style={styles.labels} placeholder="Password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false}/>

            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}

            <TouchableOpacity style={styles.Button} onPress={() => signin({email, password})}>
                <Text style={styles.Text}>Login</Text>
            </TouchableOpacity>

            <AuthNavigation 
                textLink="Create Account"
                navigationText="Register"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#47d397"
    },
    labels: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: 5,
        paddingHorizontal: 10,
        width: 275,
        height: 40
    },
    title: {
        color: "#1DA730",
        marginTop: -40,
        marginBottom: 40,
        fontSize: 38,
        fontWeight: "bold"

    },
    icon:{
        height: 250,
        width: 200
        
    },
    Button: {
        backgroundColor: "#011936",
        borderRadius: 15,
        paddingHorizontal: 15,
        borderWidth: 0,
        marginTop: 20,
        elevation: 9,
        height: 40,
        width: 135,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    Text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    errorMessage: {
        color: "#E32A02",
        marginTop: 10,
        fontSize: 15,
        alignSelf: "center" 
    }
});

export default LoginScreen;