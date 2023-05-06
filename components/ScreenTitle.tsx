import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "../utils/colors";
import { CenterHorizontal, CenterVertical } from "../utils/GlobalStyles";

type ScreenTitleProp = {
    children: React.ReactNode,
    size: number,
    center?: boolean,
    renderBackIcon?: boolean,
    backIcon?: React.ReactNode,
    backAction?: () => void,
    color?: string,
};

function ScreenTitle({ children, size, center = false, renderBackIcon = false, backIcon, backAction, color }: ScreenTitleProp) {
    return (
        <View style={styles.root}>
            <TouchableOpacity style={styles.backBtn} onPress={backAction}>
                {renderBackIcon && backIcon}
            </TouchableOpacity>
            <Text
                style={[renderBackIcon && { marginLeft: 12 }, styles.title, color && { color: color }, { fontSize: size },
                center ? CenterHorizontal : {}]}
            >
                {children}
            </Text>
        </View>
    );
}
export default ScreenTitle;

const styles = StyleSheet.create({
    root: {
        height: 50,
        paddingHorizontal: 18,
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Inika-Regular',
        fontSize: 20,
        color: Colors.secondary500,
    },
    backBtn: {
        paddingVertical: 13,
        marginTop: 4,
        justifyContent: 'center',
    }
});