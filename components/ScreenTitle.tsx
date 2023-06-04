import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Pressable } from 'react-native';
import Colors from "../utils/colors";
import { CenterHorizontal, CenterVertical } from "../utils/GlobalStyles";
import Btn from './Btn';

type ScreenTitleProp = {
    children: React.ReactNode,
    size: number,
    center?: boolean,
    renderBackIcon?: boolean,
    backIcon?: React.ReactNode,
    backAction?: (event: GestureResponderEvent) => void,
    color?: string,
};

function ScreenTitle({ children, size, center = false, renderBackIcon = false, backIcon, backAction = () => { }, color }: ScreenTitleProp) {
    return (
        <View style={styles.root}>{
            renderBackIcon ?
                // <Btn bg='#fefefe2c' type='filled' txtSize={10} customStyle={{ paddingVertical: 16, paddingHorizontal: 8, borderRadius: 10 }} onTap={backAction}
                //     label={renderBackIcon && backIcon}
                // />
                <Pressable onPress={backAction} style={styles.backBtn}>{backIcon}</Pressable>
                : null
        }
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
        fontFamily: 'Inika-Bold',
        fontSize: 20,
        color: Colors.secondary500,
    },
    backBtn: {
        paddingVertical: 13,
        marginTop: 4,
        justifyContent: 'center',
    }
});