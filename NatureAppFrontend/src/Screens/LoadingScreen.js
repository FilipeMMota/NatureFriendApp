import React, { useEffect, useContext} from "react";
import {View, StyleSheet, Image} from "react-native";
import {Context as AuthContext} from "../Context/AuthContext";

const LoadingScreen = function() {

    const {checkAuthentication} = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            checkAuthentication();
        }, 2000);
    }, []);

    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={require('../../assets/NatureFriendLogo.png')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#70af85"
    },
    Icon: {
        height: 230,
        width: 350
    }
});

export default LoadingScreen;