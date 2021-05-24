import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";

const AuthNavigation = function({navigation, textLink, navigationText}) {
    return(
        <View>
            <TouchableOpacity onPress = {() => navigation.navigate(navigationText)}>
                <Text style={styles.linkText}>{textLink}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    linkText: {
        color: "#3380FF",
        marginTop: 15,
        fontSize: 15,
        alignSelf: "center"
    }
});

export default withNavigation(AuthNavigation);