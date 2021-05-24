import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PostsScreen = function() {
    return (
        <View style={styles.Content}>
        <View>
            <Text style= {styles.Titulo}>Lixo na floresta</Text>
            <Text style= {styles.Data}>Created on 27/05/2021</Text>
            <Text style= {styles.Description}>Description</Text>
            <TextInput style={styles.DescriptionField}/>
        </View>
        <TouchableOpacity style={styles.SolvedButton} onPress={() => console.log("Ta resolvido")}>
                <Text style={styles.Text}>Solved Issue!</Text>
        </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        backgroundColor: "#98EBB1",
        alignItems: "center",
    },

    Titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 150
    },
    Data: {
        fontSize: 13,
        alignSelf: 'center',
        opacity: 0.5
    },
    Description: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 30
    },
    DescriptionField: {
        width:320,
        height:350,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        marginTop:25,
        borderWidth: 1,
        borderColor: "gray"
    },
    SolvedButton: {
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
        fontSize: 15,
        fontWeight: 'bold',

    },    
});

export default PostsScreen;