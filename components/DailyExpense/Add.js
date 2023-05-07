import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image, ScrollView } from 'react-native';
import BackIcon from '../../assets/images/leftArrow.svg';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import ScreenTitle from "../ScreenTitle";
import Input from "../Input";
import { AuthContext } from "../../store/authContext";
import SpaceMaker from "../SpaceMaker";
import { post } from "../../utils/magicBox";
import { CenterHorizontal, CenterVertical } from "../../utils/GlobalStyles";
import Colors from "../../utils/colors";
import Btn from "../Btn";


const addXpenseState = {
    uid: '',
    paidTo: '',
    amount: '',
    note: '',
    label: {},
    proof: null,
};


function addXpenseReducer(state, action) {
    switch (action.type) {
        case 'uid':
            return { ...state, uid: action.payload };
        case 'paidTo':
            return { ...state, paidTo: action.payload };
        case 'amount':
            return { ...state, amount: action.payload };
        case 'note':
            return { ...state, note: action.payload };
        case 'label':
            return { ...state, label: action.payload };
        case 'proof':
            return { ...state, proof: action.payload };
        default:
            return addXpenseState;
    }
}


//! Main 
function Add({ navigation, route }) {
    // const navigation = useNavigation();
    const authCtx = useContext(AuthContext);

    const [addXpenseData, addXpenseDispatch] = useReducer(addXpenseReducer, addXpenseState);
    const [labels, setLabels] = useState([]);
    useEffect(() => {
        addXpenseDispatch({ type: 'uid', payload: authCtx.token });
    }, []);

    useEffect(() => {
        const getLabels = async () => {
            const response = await post({}, 'label/get-all', {
                headers: {
                    'Authorization': `Bearer ${authCtx.token}`
                }
            });
            setLabels(response.labels);
        };
        getLabels();
    }, []);

    // Dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    // --Dropdown

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            allowsEditing: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                // Image selected successfully
                addXpenseDispatch({ type: 'proof', payload: response.assets[0] });
                console.log(response.assets[0]);
            }
        });
    };

    const captureImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            allowsEditing: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image capture');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                // Image captured successfully
                addXpenseDispatch({ type: 'proof', payload: response.assets[0] });
            }
        });
    };

    function handleBack() {
        addXpenseDispatch();
        // navigation.goBack();
        navigation.navigate('DailyExpense', { refresh: true });

    }
    const [isLoading, setIsLoading] = useState(false);

    async function handleAdd() {
        if (isLoading) return;
        setIsLoading(true);
        const response = await post(addXpenseData, 'daily-expense/create', {});
        console.log(response.data);
        navigation.navigate('DailyExpense', { refresh: true });

    }

    return (
        <View style={ styles.Root }>
            <ScreenTitle backAction={ handleBack } size={ 22 } renderBackIcon={ true } center={ true } backIcon={ <BackIcon /> }>Add Expense</ScreenTitle>
            <ScrollView>
                <SpaceMaker custom={ { height: 24 } } />
                <Input label="paid to" inputType="" keyType="default" action="paidTo" onInput={ addXpenseDispatch } data={ addXpenseData.paidAt } />
                <SpaceMaker custom={ { height: 32 } } />
                <Input label="amount" inputType="" keyType="number-pad" action="amount" onInput={ addXpenseDispatch } data={ addXpenseData.amount.toString() } />
                <SpaceMaker custom={ { height: 32 } } />
                <Input multiline={ true } lines={ 100 } label="note" keyType="default" action="note" onInput={ addXpenseDispatch } data={ addXpenseData.note } />
                <SpaceMaker custom={ { height: 32 } } />
                <Dropdown
                    style={ [styles.dropdown, isFocus && { borderColor: Colors.accent500 }] }
                    placeholderStyle={ styles.placeholderStyle }
                    selectedTextStyle={ styles.selectedTextStyle }
                    inputSearchStyle={ styles.inputSearchStyle }
                    iconStyle={ styles.iconStyle }
                    data={ labels }
                    maxHeight={ 300 }
                    labelField="name"
                    activeColor={ Colors.accent800 }
                    containerStyle={ { backgroundColor: Colors.primary600, borderRadius: 6, overflow: 'hidden', marginTop: 7, borderWidth: 0 } }
                    itemContainerStyle={ { borderBottomWidth: 1, borderBottomColor: Colors.accent800 } }
                    valueField="color"
                    placeholder={ !isFocus ? 'Select Label' : '...' }
                    value={ value }
                    onFocus={ () => setIsFocus(true) }
                    onBlur={ () => setIsFocus(false) }
                    onChange={ item => {
                        setValue(item.value);
                        addXpenseDispatch({ type: 'label', payload: { _id: item._id, name: item.name, color: item.color, access: item.access } });
                        setIsFocus(false);
                    } } />
                <SpaceMaker custom={ { height: 32 } } />
                <ScreenTitle size={ 18 } color={ Colors.white300 }>Proof</ScreenTitle>
                { addXpenseData.proof !== null ? <Image style={ styles.previewImage } source={ { uri: addXpenseData.proof.uri } } /> : '' }
                { addXpenseData.proof !== null ? <SpaceMaker custom={ { height: 32 } } /> : '' }
                <View style={ styles.imagePickerBtn }>
                    <Btn label="Select Image" bg={ Colors.accent500 } type="filled" onTap={ selectImage } customStyle={ { flex: 1, borderRadius: 1, paddingVertical: 12, } } />
                    <Btn label="Capture Image" bg={ Colors.accent800 } type="filled" onTap={ captureImage } customStyle={ { flex: 1, borderRadius: 1, paddingVertical: 12, } } />
                </View>
                <SpaceMaker custom={ { height: 32 } } />

            </ScrollView>
            <View style={ styles.actionBtn }>
                <Btn label='Cancel' bg={ Colors.danger } type="none" onTap={ handleBack } txtSize={ 20 } customStyle={ { flex: 1, padding: 8 } } />
                <Btn label='Add' bg={ Colors.success } isLoading={ isLoading } spinnerColor={ Colors.white300 } type="filled" onTap={ handleAdd } txtSize={ 20 } customStyle={ { flex: 1, padding: 8 } } />
            </View>
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    Root: {
        flex: 1,
    },
    dropdown: {
        height: 50,
        width: '90%',
        ...CenterHorizontal,
        borderColor: '#767676',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#efefef',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    imagePickerBtn: {
        width: '90%',
        ...CenterHorizontal,
        flexDirection: 'row',
    },
    previewImage: {
        width: 200,
        height: 200,
        ...CenterHorizontal,
        borderRadius: 16,
    },
    actionBtn: {
        width: '90%',
        ...CenterHorizontal,
        flexDirection: 'row',
        paddingVertical: 8,
        marginBottom: 6,
    },
});