import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Posts = function ({PostTitle, Descrição, Data}) {
    return (
        <View style= {styles.Individual}>
            <Text style= {styles.Titulo}>{PostTitle}</Text>
            <Text style= {styles.Descricao} >{Descrição}</Text>
            <Text style= {styles.Data}>{Data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default Posts;