import React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import AuthNavigation from "../Components/AuthNavigation";

const LoginScreen = function () { 
    return (
        <View style={styles.Content}>
            <Image style={styles.icon} source={require('../../assets/IconNature.png')} />
            <Text style={styles.title}>Nature </Text>

            <TextInput style={styles.labels} placeholder="Username" autoCapitalize="none" autoCorrect={false}/>
            <TextInput secureTextEntry style={styles.labels} placeholder="Password" autoCapitalize="none" autoCorrect={false}/>

            <AuthNavigation 
                buttonTitle="Login"
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
        backgroundColor: "#98EBB1"
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
        
    }
});

export default LoginScreen;