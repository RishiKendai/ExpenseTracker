import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../utils/colors";
import { CenterHorizontal } from "../utils/GlobalStyles";

type ScreenTitleProp = {
    children: React.ReactNode,
    size: number,
    center?: boolean,
    renderBackIcon?: boolean,
    backIcon?: React.ReactNode,
};

function ScreenTitle({ children, size, center = false, renderBackIcon = false, backIcon }: ScreenTitleProp) {
    return (
        <View style={styles.root}>
            {renderBackIcon && backIcon}
            <Text
                style={[renderBackIcon && { marginLeft: 12 }, styles.title, { fontSize: size },
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
    }
});