import React, {useContext} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Context as AuthContext} from "../Context/AuthContext";
import {AntDesign} from "@expo/vector-icons";
import Posts from '../Components/Posts';

const UserScreen = function({navigation}) {

    const {signout} = useContext(AuthContext);

    const AlertSignOut = () =>
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => signout() }
      ],
      { cancelable: false }
    )

    const posts = [
        { PostTitle: "Lixo na Floresta", Description: "Lixo nos pintelhos do Miguel" , Data: "Created on 29/05/2021"},
        { PostTitle: "Lixo na Alameda", Description: "O Miguel é o lixo" , Data: "Created on 29/05/2021"},
        { PostTitle: "Lixo em Carcavelos", Description: "Na casa do Gui" , Data: "Created on 29/05/2021"},
        { PostTitle: "Lixo na Graça", Description: "Atão primo?!?😠" , Data: "Created on 29/05/2021"},
        { PostTitle: "Lixo em Carnaxide", Description: "Santinho, tens conduzido?" , Data: "Created on 29/05/2021"}
    ];
    

    return (
        <View style={styles.Content}>
            <View>
                <View style= {styles.ProfilePicture}>
                    <View style = {styles.icon}>
                        <TouchableOpacity>
                            <AntDesign name="pluscircle" color={"#011936"} size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>

            <Text style= {styles.Username}>UserName</Text>
            <Text style= {styles.RegisteredDate}>Registered since 69/69/2069</Text>


            <Text style= {styles.Text}>My Posts</Text>

            <View style= {styles.Posts}>
                    
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor = {posts => posts.PostTitle}
                    data={posts}
                    renderItem = {( {item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                            <Posts
                                PostTitle = {item.PostTitle}
                                Descrição = {item.Description}
                                Data = {item.Data}
                            >
                            </Posts>
                        </TouchableOpacity>
                    );
                    }}
                />
            </View>
            <TouchableOpacity style={styles.SignOut} onPress={() => AlertSignOut()}>
                <Text style={styles.TextSignOut}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        backgroundColor: "#47d397",
        alignItems: "center",
    },
    icon: {
        paddingTop: 78,
        paddingLeft: 88
    },
    ProfilePicture: {
        width: 110,
        height: 110,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        marginTop: hp("9%")
    },
    Username: {
        fontSize: hp("4.2%"),
        fontWeight: 'bold'

    },
    RegisteredDate: {
        fontSize: hp("1.8%"),
        opacity: 0.5
    
    },
    Text: {
        fontSize: hp("3.7%"),
        marginTop: hp("3%"),
        alignSelf:'flex-start',
        paddingLeft: wp("15%"),
        fontWeight: 'bold'
    },
    Posts: {
        width: wp("80%"),
        height: hp("45%"),
        justifyContent: "space-around",
        borderRadius: 100,
        alignItems: 'center'  
    },
    SignOut: {
        backgroundColor: "#011936",
        borderRadius: 15,
        paddingHorizontal: 15,
        marginTop: hp("2%"),
        elevation: 9,
        height: 40,
        width: 135,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    TextSignOut:{
        color: "#ffffff",
        fontWeight: "bold"
    }
});

export default UserScreen;