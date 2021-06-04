import React, {useEffect, useState, useRef} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {NavigationEvents} from "react-navigation";

const CameraScreen = function() {
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHaspermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
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
    
    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }


    return (
        <View>
            <NavigationEvents onWillFocus={() => setIsFocused(navigation.isFocused())} onWillBlur={() => setIsFocused(navigation.isFocused())}/>
            {isFocused && 
            <Camera
                type={type}
                style={styles.camera}
                ref={camRef}
            >
                <View style={{ flex:1, backgroundColor: 'transparent' }}>
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
                        <MaterialIcons name="flip-camera-ios" size={45} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
                
                    <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                        <FontAwesome  name="camera" size={23} color="#FFF" />
                    </TouchableOpacity>
                
            </Camera> }
                
            { capturedPhoto &&
                <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                >
                    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <TouchableOpacity style={styles.closeModal} onPress={ () => setOpen(false)}>
                            <FontAwesome name="window-close" size={50} color="#FF0000" />
                        </TouchableOpacity>

                        <Image
                        style={styles.Image}
                        source={{uri:capturedPhoto}}
                        />
                    </View>
                </Modal>
            }
        </View>
    );
    }


const styles = StyleSheet.create({
    camera:{
        height: hp("100%"),
        width: wp("100%")
    
    
    },
    cameraButton:{
        backgroundColor: '#19456b',
         marginBottom: 100,
          justifyContent:'center',
          alignItems:'center',
          height:50,
          borderRadius: 10,
          marginHorizontal: 25
     
    },
    flipCamera:{
        alignItems: 'flex-end',
        padding: 35
        
    },
    closeModal:{
        margin: 10
    },
    Image:{
        width:wp("80%"),
        height:hp("40%"),
        borderRadius: 20
        
    }



});

export default CameraScreen;