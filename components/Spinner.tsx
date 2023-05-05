import React from 'react';
import { UIActivityIndicator } from "react-native-indicators";
import Colors from "../utils/colors";
import { View, Text, StyleSheet } from 'react-native';

type SpinnerProp = {
    size: number,
    msg: string,
};

function Spinner({ size, msg }: SpinnerProp) {
    return (
        <View style={styles.Root}>
            <View style={styles.Spinner}>
                <UIActivityIndicator size={size} color={Colors.accent500} />
            </View>
            <Text style={styles.Message}>{msg}</Text>
        </View >

    );
}
export default Spinner;

const styles = StyleSheet.create({
    Root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Spinner: {
        height: 50,
        marginBottom: 10,
    },
    Message: {
        fontFamily: 'Montserrat-Black',
        fontSize: 20,
        color: Colors.accent500,
    },
});