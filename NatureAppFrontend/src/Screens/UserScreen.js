import React from 'react';
import { Text, StyleSheet,View, TouchableOpacity, Touchable, ImageBackground} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import Posts from '../Components/Posts';

const UserScreen = function() {
    return (
        <View style={styles.Content}>
            <View style={styles.Parent}>
                <View style= {styles.ProfilePicture}>
                </View>
                <View style = {styles.Child}>
                    <TouchableOpacity>
                        <AntDesign name="pluscircle" size={20}/>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style= {styles.Username}>User Name</Text>
            <Text style= {styles.Registered}>Registered since 27/05/2021</Text>


            <Text style= {styles.Text}>My Posts</Text>

            <View style= {styles.Posts}>

                <Posts
                PostTitle = 'Lixo na Floresta'
                Descrição = 'bla bla bla'
                Data = 'Created on 27/05/2021'
                />
                <Posts
                PostTitle = 'Rio Poluido'
                Descrição = 'bla bla bla'
                Data = 'Created on 27/05/2021'
                />
                <Posts
                PostTitle = 'Rua Suja'
                Descrição = 'bla bla bla'
                Data = 'Created on 27/05/2021'
                />
                <Posts
                PostTitle = 'Arvores Vandlizadas'
                Descrição = 'bla bla bla'
                Data = 'Created on 27/05/2021'
                />
 
            </View>
            <TouchableOpacity style={styles.SignOff} onPress={() => console.log("saiu")}>
                <Text style={styles.TextSignOff}>SignOff</Text>
            </TouchableOpacity>  
        </View>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        backgroundColor: "#98EBB1",
        alignItems: "center",
    },
    Parent:{
        position: 'relative'
    },
    Child: {
        position:'absolute',
        top:110,
        left:75
    },
    ProfilePicture: {
        width:100,
        height:100,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        marginTop: 35
    },
    Username: {
        fontSize: 30,
        fontWeight: 'bold'

    },
    Registered: {
        fontSize: 13,
        opacity: 0.5
    
    },
    Text: {
        fontSize:30,
        marginTop:20,
        alignSelf:'flex-start',
        marginLeft: 50,
        fontWeight: 'bold'
    },
    Posts: {
        width:320,
        height:600,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        marginTop: 15,
        alignItems: 'center'  
    },
    SignOff: {
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
        fontSize:30,
        marginTop:20,
        alignSelf:'flex-start',
        marginLeft: 50,
        fontWeight: 'bold'
    },
});

export default UserScreen;