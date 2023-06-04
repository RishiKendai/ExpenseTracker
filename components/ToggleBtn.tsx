import { View, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../utils/colors';

/// TYPES
type toggleBtnProps = {
    toggled?: boolean;
    // onTap: (action: string, payload: any) => void;
    onTap: Function;
    action: string;
    width: number;
    height: number;
    radius: number;
};


//>> MAIN FUNCTION
const ToggleBtn = ({ toggled = false, onTap, action, width, height, radius }: toggleBtnProps) => {
    /// USE STATE
    const [isToggle, setIsToggle] = useState(false);


    /// INITIAL RENDER
    useFocusEffect(useCallback(() => {
        setIsToggle(toggled);
    }, [toggled]))


    /// FUNCTIONS
    function handlePress() {
        setIsToggle(prev => !prev)
        onTap({ type: action, payload: !isToggle });
    }

    //>> RETURN
    return (
        <Pressable style={styles.toggleBtn} onPress={handlePress}>
            <View style={[{ width: width, height: height, borderRadius: width }, isToggle ? styles.ToggleOvalActive : styles.ToggleOval]}>
                <View style={[{ height: radius, width: radius, borderRadius: radius }, isToggle ? styles.ToggleRoundActive : styles.ToggleRound]}></View>
            </View>
        </Pressable>
    )
}
export default ToggleBtn


const styles = StyleSheet.create({
    toggleBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ToggleOval: {
        // backgroundColor: '#8c8c8c8c',
        backgroundColor: '#E9E9EA',
        paddingHorizontal: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ToggleRound: {
        backgroundColor: Colors.white500,
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        elevation: 3,
        shadowOffset: { width: 0, height: 3 },
    },
    ToggleOvalActive: {
        paddingHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors.success
    },
    ToggleRoundActive: {
        backgroundColor: Colors.white500,
    }
});
