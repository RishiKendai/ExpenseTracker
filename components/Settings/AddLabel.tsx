import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useReducer, useContext, useEffect, useState } from 'react'
import ScreenTitle from '../ScreenTitle'
import SpaceMaker from '../SpaceMaker'
import { AuthContext } from '../../store/authContext'
import Input from '../Input'
import Btn from '../Btn'
import Colors from '../../utils/colors'
import { CenterHorizontal } from '../../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { post } from '../../utils/magicBox'


type ColorProp = {
    hue: string,
    saturation: string,
    lightness: string,
}

type LabelStateProp = {
    name: string;
    access: string,
    color: ColorProp,

}
const labelState: LabelStateProp = {
    name: '',
    access: '',
    color: {
        hue: '',
        saturation: '',
        lightness: ''
    },
}
type ActionProp = {
    type: string;
    payload: any;
}

function labelReducer(state: LabelStateProp, action: ActionProp) {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload };
        case 'access':
            return { ...state, access: action.payload };
        case 'color-hue':
            return { ...state, color: { ...state.color, hue: action.payload.toString() } };
        case 'color-saturation':
            return { ...state, color: { ...state.color, saturation: action.payload.toString() } };
        case 'color-lightness':
            return { ...state, color: { ...state.color, lightness: action.payload.toString() } };
        default:
            return labelState;
    }
}

//! Main
const AddLabel = () => {
    const navigation = useNavigation()
    const authCtx = useContext(AuthContext);

    const [labelData, labelDispatch] = useReducer(labelReducer, labelState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        labelDispatch({ type: 'access', payload: authCtx.token });
    }, []);

    async function handleAdd() {
        if (isLoading) return;
        setIsLoading(true)
        const response = await post(labelData, 'label/create', {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        })
        if (response.status === 'failed') {
            setIsLoading(false)
        }
        setIsLoading(true)
        navigation.goBack()

    }
    function handleBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.root}>
            <ScreenTitle size={22} center={true}>Add Label</ScreenTitle>
            <ScrollView>
                <SpaceMaker custom={{ height: 24 }} />
                <Input label='Label name' action='name' onInput={labelDispatch} data={labelData.name} keyType='default' />
                <SpaceMaker custom={{ height: 24 }} />
                <Input label='hue' action='color-hue' onInput={labelDispatch} data={labelData.color.hue} keyType='decimal-pad' />
                <SpaceMaker custom={{ height: 24 }} />
                <Input label='saturation' action='color-saturation' onInput={labelDispatch} data={labelData.color.saturation} keyType='decimal-pad' />
                <SpaceMaker custom={{ height: 24 }} />
                <Input label='lightness' action='color-lightness' onInput={labelDispatch} data={labelData.color.lightness} keyType='decimal-pad' />
                <SpaceMaker custom={{ height: 24 }} />
                <View style={styles.labelWrapper}>
                    <View style={[styles.label, { backgroundColor: `hsla(${+labelData.color.hue}, ${+labelData.color.saturation}%, ${+labelData.color.lightness}%, 0.22)` }]}>
                        <Text style={[styles.labelText, { color: `hsl(${+labelData.color.hue}, ${+labelData.color.saturation}%, ${+labelData.color.lightness}%)` }]}>{labelData.name}</Text>
                    </View>
                </View>
                <SpaceMaker custom={{ height: 80 }} />

            </ScrollView>
            <View style={[styles.actionBtn, CenterHorizontal]}>
                <Btn label='Cancel' bg={Colors.danger} type="none" onTap={handleBack} txtSize={20} customStyle={{ flex: 1, padding: 8 }} />
                <Btn label='Add' bg={Colors.success} isLoading={isLoading} spinnerColor={Colors.white300} type="filled" onTap={handleAdd} txtSize={20} customStyle={{ flex: 1, padding: 8 }} />
            </View>
        </View>

    )
}

export default AddLabel

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    actionBtn: {
        width: '90%',
        flexDirection: 'row',
        paddingVertical: 8,
        bottom: 6,
        backgroundColor: Colors.primary500,
    },
    labelWrapper: {
        flex: 1.5,
        marginRight: 6,
    },
    label: {
        width: 125,
        padding: 8,
        borderRadius: 6,
        ...CenterHorizontal,
    },
    labelText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
})  