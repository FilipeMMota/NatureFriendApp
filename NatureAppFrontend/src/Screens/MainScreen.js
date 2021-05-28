import React from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';

const MainScreen = function() {
    return ( // teste
        <SafeAreaView forceInset={{top: "always"}}> 
            <Text style={styles.textStyle}>Camera</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    }

});

export default MainScreen;