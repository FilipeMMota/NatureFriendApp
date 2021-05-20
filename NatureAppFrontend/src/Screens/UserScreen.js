import React from 'react';
import { Text, StyleSheet,View, TouchableOpacity, Touchable, ImageBackground} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

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
                <View style= {styles.Individual}>
                    <Text style= {styles.Titulo}>Lixo na floresta</Text>
                    <Text style= {styles.Descricao} >bla bla bla bla</Text>
                    <Text style= {styles.Data}>Created on 27/05/2021</Text>
                </View>
                <View style= {styles.Individual}>
                    <Text style= {styles.Titulo}>Rio Poluido</Text>
                    <Text style= {styles.Descricao} >bla bla bla bla</Text>
                    <Text style= {styles.Data}>Created on 27/05/2021</Text>
                </View>
                <View style= {styles.Individual}>
                    <Text style= {styles.Titulo}>Rua Suja</Text>
                    <Text style= {styles.Descricao} >bla bla bla bla</Text>
                    <Text style= {styles.Data}>Created on 27/05/2021</Text>
                </View>
                <View style= {styles.Individual}>
                    <Text style= {styles.Titulo}>Arvores Vandlizadas</Text>
                    <Text style= {styles.Descricao} >bla bla bla bla</Text>
                    <Text style= {styles.Data}>Created on 27/05/2021</Text>
                </View>
            </View>
            
            
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

    Individual:{
        width:270,
        height:100,
        backgroundColor: "#1A3B47",
        borderRadius: 25,
        marginTop: 25
    },

    Titulo: {
        fontSize:15,
        alignSelf:'center',
        marginLeft:35,
        marginTop:20,
        color:"#FFFFFF",
        fontWeight: 'bold'

    },

    Descricao: {
        fontSize:10,
        alignSelf:'center',
        marginLeft:35,
        color:"#FFFFFF",
        opacity:0.5
    },

    Data: {
        fontSize:10,
        alignSelf:'center',
        marginLeft:35,
        marginTop:8,
        color:"#FFFFFF",
        opacity:0.5
    }



});

export default UserScreen;