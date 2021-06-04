import React, {useEffect, useState, useRef} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal, Image, CameraRoll} from 'react-native';
import {Camera} from 'expo-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {NavigationEvents} from "react-navigation";

import * as MediaLibrary from 'expo-media-library';

const CameraScreen = function({navigation}) {
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
    
        
        (async () => {
            const {status} = await MediaLibrary.requestPermissionsAsync();
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

    async function savePicture() {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
        .then(()=> {
            alert('Picture Saved!')
        })
        .catch(error =>{
            console.log('err,error');
        })
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
                    <View style={{ flex: 1, position:'relative', backgroundColor: 'transparent'}}>
                        <View style={{flex: 1, justifyContent: "flex-start"}}>
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
                        
                        <View style={{flex: 1, justifyContent: "flex-end"}}>
                            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                                <FontAwesome  name="camera" size={23} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </Camera>
            }
                
            { capturedPhoto &&
                <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                >
                    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        
                        <View style = {{margin: 10, flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.closeModal} onPress={ () => setOpen(false)}>
                            <FontAwesome name="window-close" size={50} color="#FF0000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeModal} onPress={savePicture}>
                            <FontAwesome name="upload" size={50} color="#121212" />
                        </TouchableOpacity>
                        </View>

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
    
    container: {
        flex: 1
    },
    camera:{
        height: hp("100%"),
        width: wp("130%")
    },
    cameraButton:{
        backgroundColor: '#19456b',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: hp("9%"),
        marginRight: wp("37.5%"),
        height:50,
        borderRadius: 10,
        marginHorizontal: 25

    },
    flipCamera:{
        alignItems: 'flex-end',
        justifyContent: "flex-start",
        padding: 35,
        marginRight: wp("25%")   
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