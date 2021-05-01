import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";

const AuthNavigation = function({navigation, buttonTitle, textLink, navigationText}) {
    return(
        <View>
            <TouchableOpacity style={styles.Button} onPress={() => console.log("PLS KILL ME!")}>
                <Text style={styles.Text}>{buttonTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => navigation.navigate(navigationText)}>
                <Text style={styles.linkText}>{textLink}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
    linkText: {
        color: "#3380FF",
        marginTop: 15,
        fontSize: 15,
        alignSelf: "center"
    }
});

export default withNavigation(AuthNavigation);