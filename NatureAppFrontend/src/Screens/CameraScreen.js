import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NavigationEvents} from "react-navigation";


const CameraScreen = function({navigation}) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHaspermission] = useState(null);
    const [isFocused, setIsFocused] = useState(true);

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
            <NavigationEvents onWillFocus={() => setIsFocused(navigation.isFocused())} onWillBlur={() => setIsFocused(navigation.isFocused())}/>
            {isFocused && 
            (<Camera
            type={type}
            style={styles.camera}
            >
                <View style={{flex:1, backgroundColor: 'transparent'}}>
                    <TouchableOpacity
                        style={styles.flipCamera}
                        onPress={ () =>{
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}
                    > 
                    </TouchableOpacity>
                </View>

            </Camera>)}         
        </View>
    );
    }


const styles = StyleSheet.create({

});

export default CameraScreen;