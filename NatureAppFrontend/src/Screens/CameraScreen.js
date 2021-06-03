import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import {Camera} from 'expo-camera';

const CameraScreen = function() {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHaspermission] = useState(null);

    useEffect( () => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHaspermission(status === 'granted');
        })();
    }, []);
    
    if(hasPermission === null){
        return <View/>;
    }

    if(hasPermission === false){
        return <Text> No acess to Camera</Text>;
    }


    return (
        <View>
            <Camera
            type={type}
            style={{flex:1}}
            />       
        </View>
    );
    }


const styles = StyleSheet.create({

});

export default CameraScreen;