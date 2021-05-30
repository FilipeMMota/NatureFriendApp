import React from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {RNCamera} from "react-native-camera";

const CameraScreen = function() {
    return ( // teste
        <SafeAreaView forceInset={{top: "always"}}> 
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    Camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

});

export default CameraScreen;