import React from 'react';
import { Text, StyleSheet,View} from 'react-native';

const MainScreen = function() {
    return (
        <View>
            <Text style={styles.textStyle}>Camera</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    }

});

export default MainScreen;