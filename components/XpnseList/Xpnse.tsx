import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProofProp, XpnseScreenNavigationProp, XpnseScreenRouteProp } from '../../App';
import ScreenTitle from '../ScreenTitle';
import BackIcon from '../../assets/images/leftArrow.svg';
import AddBtn from '../AddBtn';
import { CenterHorizontal } from '../../utils/GlobalStyles';
import { BlurView } from '@react-native-community/blur';
import Line from '../Line';
import { post } from '../../utils/magicBox';
import SpaceMaker from '../SpaceMaker';
import Colors from '../../utils/colors';
import { LabelProp } from '../Settings/Label';
import Insights from './Insights';

type XpnseProp = {
    navigation: XpnseScreenNavigationProp;
    route: XpnseScreenRouteProp;
}

type PreviewProp = {
    id: string;
    name: string;
    navigation: XpnseScreenNavigationProp;
}

type itemProp = {
    _id: string;
    amount: number;
    expenseId: string;
    expenseType: string;
    label: LabelProp;
    name: string;
    note: string;
    paidAt: string;
    payeeName: string;
    proof: ProofProp;
}

/// PREVIEW
const Preview = ({ id, name, navigation }: PreviewProp) => {
    const [xpnse, setXpnse] = useState([]);
    const [askOptions, setAskOptions] = useState(false);
    function displayAddXpnse() {
        setAskOptions((prev) => !prev);
    }
    function handleAddManual() {
        navigation.navigate('AddXpnse', { id: id, name: name });
        setAskOptions((prev) => !prev);
    }


    function handleScan() {
        navigation.navigate('QRScannerScreen', { type: 'target' });
    }

    const fetchData = async () => {
        const response = await post(
            {},
            `expense/get-all-list/${id}`,
            {},
        );
        if (response.status === 'success') {
            setXpnse(response.data);
        }
    }
    useFocusEffect(useCallback(() => {
        fetchData()
    }, []));

    const previewXpnse = (item: itemProp) => {
        navigation.navigate('PreviewXpnse', { item: item });
    }

    const renderItem = ({ item }: { item: itemProp }) => {
        return (
            <Pressable onPress={() => previewXpnse(item)}>
                <View style={styles.item}>
                    <View style={styles.dateAndPayeeName}>
                        <Text style={styles.payeeName}>{item.payeeName}</Text>
                        <Text style={styles.paidAt}>{new Date(item.paidAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                    </View>
                    <View style={styles.labelWrapper}>
                        <View style={[styles.label, { backgroundColor: `hsla(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%, 0.22)` }]}>
                            <Text style={[styles.labelText, { color: `hsl(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%)` }]}>{item.label.name}</Text>
                        </View>
                    </View>
                    <View style={styles.amountWrapper}>
                        <Text style={styles.amount}>₹ {item.amount}</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return <View style={styles.Root}>
        {
            xpnse.length < 1
                ? <View style={styles.ScreenContainer}>
                    <Image style={styles.EmptyFolder} source={require('../../assets/images/empty_folder_3d.png')} />
                    <Text style={styles.EmptyText}>No Expense added!</Text>
                </View>
                : <View style={styles.Screen}>
                    <FlatList
                        data={xpnse}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        ListFooterComponent={() => <SpaceMaker custom={{ height: 120 }} />}
                        alwaysBounceVertical={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
        }
        <AddBtn onPress={displayAddXpnse} />
        {
            askOptions
                ? <View style={styles.askOptions}>
                    <BlurView overlayColor="transparent" style={styles.optionsBlur} blurType="dark" blurRadius={6} blurAmount={25} />
                    <Pressable onPress={handleAddManual}><Text style={styles.optionText}>Add Manually</Text></Pressable>
                    <Line customStyle={{ ...CenterHorizontal, height: 1, width: '80%', backgroundColor: '#1616175c' }} />
                    <Pressable onPress={handleScan}><Text style={styles.optionText}>Scan</Text></Pressable>
                </View>
                : ''
        }
    </View>
}
/// --PREVIEW



//! MAIN FUNCTION   
const Xpnse = ({ navigation, route }: XpnseProp) => {
    const Tab = createMaterialTopTabNavigator();
    const { id, name } = route.params
    /// USE STATE
    /// Function 
    function handleBackNavigation() {
        navigation.goBack()
    }

    const PreviewComponent = useCallback(() => {
        return <Preview id={id} name={name} navigation={navigation} />
    }, []);

    const InsightsComponent = useCallback(() => {
        return <Insights xpnseListId={id} />
    }, [])


    return (
        <SafeAreaView style={styles.Root}>
            <View style={styles.Root}>
                <ScreenTitle size={23} backAction={handleBackNavigation} renderBackIcon={true} center={true} backIcon={<BackIcon />} >{name}</ScreenTitle>
                <Tab.Navigator screenOptions={{ tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 16, fontFamily: 'Inika-Regular' } }}>
                    <Tab.Screen
                        options={{ tabBarLabel: 'Expense', }}
                        name="Preview"
                        component={PreviewComponent} />
                    <Tab.Screen options={{ tabBarLabel: 'Insights', }} name="Insights" component={InsightsComponent} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>

    )
}
export default Xpnse
/// --MAIN FUNCTION

const styles = StyleSheet.create({
    Root: {
        flex: 1,
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
        color: '#020202',
        fontFamily: 'Montserrat-Black',
        fontWeight: '600',
        padding: 12,
    },
    Screen: {
        paddingVertical: 18,
        paddingHorizontal: 13,
        height: '100%',
    },
    ScreenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    EmptyFolder: {
        height: 280,
        width: 300,
    },
    EmptyText: {
        fontSize: 22,
        marginTop: 12,
        fontFamily: 'Inika-Bold',
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
})