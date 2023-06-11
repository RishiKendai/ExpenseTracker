import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';


/// Package
import { BlurView } from "@react-native-community/blur";
import DatePicker from 'react-native-date-picker';
import { useFocusEffect } from '@react-navigation/native';


/// Components
import Btn from "../../components/Btn";
import SpaceMaker from ".././SpaceMaker";
import Line from "../../components/Line";
import Colors from "../../utils/colors";
import { CenterHorizontal } from "../../utils/GlobalStyles";
import { post } from '../../utils/magicBox';
import { AuthContext } from '../../store/authContext';
import AddBtn from "../AddBtn";
import Icon from 'react-native-vector-icons/MaterialIcons';


//>> Main
const Xpnse = ({ navigation, route }) => {

    /// USE CONTEXT
    const authCtx = useContext(AuthContext);
    /// USE STATE
    const [dailyXpnse, setDailyXpnse] = useState([]);
    const [askOptions, setAskOptions] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);


    /// INITIAL RENDER
    const fetchData = async () => {
        const response = await post(
            { uid: authCtx.token, currdate: date.toISOString() },
            'daily-expense/',
            {},
        );
        if (response.status === 'success') {
            setDailyXpnse(response.data);
        }
    };
    useFocusEffect(useCallback(() => {
        fetchData();
    }, [date]));


    /// Functions
    const handleAddExp = useCallback(() => {
        setAskOptions((prev) => !prev);
    }, []);


    function handleAddManual() {
        navigation.navigate('AddDailyExp');
        setAskOptions((prev) => !prev);
    }


    function handleScan() {
        navigation.navigate('QRScannerScreen', { type: 'daily' });
    }


    /// Custom Components
    const IconAndDate = () => {
        return (
            <Pressable style={ styles.iconAndDate } onPress={ () => setOpen(true) }>
                <BlurView overlayColor="transparent" style={ styles.iconDateBlur } blurType="dark" blurRadius={ 10 } blurAmount={ 15 } />
                <Icon name="search" size={ 25 } color="#ececef9c" />
                <Text style={ { fontSize: 16, ...CenterHorizontal } }>{ date.toLocaleDateString() }</Text>
            </Pressable>
        );
    };




    function previewXpnse(item) {
        // add preview screen
        navigation.navigate('PreviewXpnse', { item: item });
    }

    const renderItem = ({ item }) => {
        return (
            <Pressable onPress={ () => previewXpnse(item) }>
                <View style={ styles.item }>
                    <View style={ styles.dateAndPayeeName }>
                        <Text style={ styles.payeeName }>{ item.payeeName }</Text>
                        <Text style={ styles.paidAt }>{ new Date(item.paidAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) }</Text>
                    </View>
                    <View style={ styles.labelWrapper }>
                        <View style={ [styles.label, { backgroundColor: `hsla(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%, 0.22)` }] }>
                            <Text style={ [styles.labelText, { color: `hsl(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%)` }] }>{ item.label.name }</Text>
                        </View>
                    </View>
                    <View style={ styles.amountWrapper }>
                        <Text style={ styles.amount }>₹ { item.amount }</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={ { flex: 1 } }>
            <IconAndDate />
            <DatePicker
                modal
                open={ open }
                date={ date }
                mode='date'
                onConfirm={ (date) => {
                    setOpen(false);
                    setDate(date);
                } }
                onCancel={ () => {
                    setOpen(false);
                } }
            />
            {/* Add Button */ }
            <AddBtn onPress={ handleAddExp } />
            {/* Ask Option */ }
            {
                askOptions
                    ?
                    <View style={ styles.askOptions }>
                        <BlurView overlayColor="transparent" style={ styles.optionsBlur } blurType="dark" blurRadius={ 6 } blurAmount={ 25 } />
                        <Pressable onPress={ handleAddManual }><Text style={ styles.optionText }>Add Manually</Text></Pressable>
                        <Line customStyle={ { ...CenterHorizontal, height: 1, width: '80%', backgroundColor: '#1616175c' } } />
                        <Pressable onPress={ handleScan }><Text style={ styles.optionText }>Scan</Text></Pressable>
                    </View>
                    : null
            }
            <SpaceMaker custom={ { height: 24 } } />

            {
                (dailyXpnse.length > 0)
                    ?
                    <View style={ styles.flex1 }>

                        <FlatList data={ dailyXpnse } renderItem={ renderItem } keyExtractor={ (item) => item._id }
                            ListFooterComponent={ () => <SpaceMaker custom={ { height: 120 } } /> }
                            alwaysBounceVertical={ true }
                            showsVerticalScrollIndicator={ false }
                        />
                    </View>
                    : (<View><Text>none</Text></View>)
            }
        </View>
    );
};

export default Xpnse;

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
        zIndex: -1,
    },
    item: {
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 18,
        flexDirection: 'row',
    },
    dateAndPayeeName: {
        flex: 3,
        // width: '60%',

    },
    payeeName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        textTransform: 'capitalize',
        color: Colors.white300,
    },
    paidAt: {
        fontSize: 12,
        color: '#EEf1f88C'
    },
    labelWrapper: {
        flex: 1.5,
        marginRight: 6,
    },
    label: {
        padding: 8,
        borderRadius: 6,
    },
    labelText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    amountWrapper: {
        flex: 1,
        padding: 6,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    amount: {
        fontFamily: 'Inika-Bold',
        fontSize: 16,
        color: '#EEf1f88C',
    },
    iconAndDate: {
        position: 'absolute',
        zIndex: 3,
        bottom: 70,
        left: '50%',
        marginLeft: -50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderRadius: 50,
        width: 120,
        height: 38,
        overflow: 'hidden',
    },
    iconDateBlur: {
        position: 'absolute',
        backgroundColor: '#cececf2c',
        height: '100%',
        width: 120,
    },
    optionsBlur: {
        position: 'absolute',
        backgroundColor: '#ececef4c',
        height: '100%',
        width: '100%',
    },
    askOptions: {
        position: 'absolute',
        borderRadius: 16,
        bottom: 120,
        overflow: 'hidden',
        right: 25,
    },
    optionText: {
        fontSize: 18,
        // color: '#161617',
        color: '#020202',
        fontFamily: 'Montserrat-Black',
        fontWeight: '600',
        padding: 12,
    },
});