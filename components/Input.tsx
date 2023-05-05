import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { CenterHorizontal } from "../utils/GlobalStyles";
import Colors from "../utils/colors";
import { KeyboardTypeOptions, CapitalizeOptions } from '../utils/GlobalTypes'

type InputProp = {
    label: string,
    onInput: Function,
    data: string,
    inputType?: string,
    action: string,
    keyType: KeyboardTypeOptions,
    captialize?: CapitalizeOptions,
};


//! Main function
function Input({ label, onInput, data, inputType, action, keyType, captialize = 'none' }: InputProp) {
    const [inputFocus, setInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function handleInputFocus() {
        setInputFocus(true);
    }

    function handleInputBlur() {
        if (inputValue === '') {
            setInputFocus(false);
        }
    }
    function handleInputChange(value: string) {
        setInputValue(value);
        onInput({ type: action, payload: value });

    }
    return (
        <View style={[styles.InputBox, CenterHorizontal]}>
            <View style={[styles.Label, inputFocus && styles.LabelFocus]}>
                <Text style={[styles.LabelContent, inputFocus && styles.LabelContentFocus]}>{label}</Text>
            </View>
            <TextInput
                autoCapitalize={captialize}
                keyboardType={keyType}
                secureTextEntry={inputType === 'password'}
                style={styles.Input}
                value={data}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange} />
        </View>
    );
}
export default Input;

const styles = StyleSheet.create({
    InputBox: {
        height: 55,
        width: '90%',
        borderColor: '#767676',
        borderWidth: 1,
        borderRadius: 6,
    },
    Label: {
        backgroundColor: Colors.primary500,
        flex: 1,
        position: 'absolute',
        paddingHorizontal: 13,
        left: 13,
        top: 13,
    },
    LabelFocus: {
        top: -10,
    },
    LabelContent: {
        color: '#efefec',
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        textTransform: 'capitalize',
    },
    LabelContentFocus: {
        fontSize: 14,
    },
    Input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        paddingTop: 16,
        paddingHorizontal: 14,
        color: '#efefec',
    },
});