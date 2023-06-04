import React from 'react';
import { UIActivityIndicator } from "react-native-indicators";
import Colors from "../utils/colors";
import { View, Text, StyleSheet } from 'react-native';

type SpinnerProp = {
    size: number,
    msg?: string,
    color: string
};

function Spinner({ size, msg, color }: SpinnerProp) {
    return (
        <View style={styles.Root}>
            <View style={styles.Spinner}>
                <UIActivityIndicator size={size} color={color} />
            </View>
            {msg ?
                <Text style={[styles.Message, { color: color }]}>{msg}</Text>
                : null
            }
        </View >

    );
}
export default Spinner;

const styles = StyleSheet.create({
    Root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Spinner: {
        height: 50,
    },
    Message: {
        marginTop: 10,
        fontFamily: 'Montserrat-Black',
        fontSize: 20,
    },
});