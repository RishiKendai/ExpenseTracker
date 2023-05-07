import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useContext, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '../ScreenTitle';
import SVGIcons from '../../utils/SVGIcons';
import LeftArrow from '../../assets/images/leftArrow.svg';
import { AuthContext } from '../../store/authContext';
import { post } from '../../utils/magicBox';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CenterHorizontal, CenterVertical } from '../../utils/GlobalStyles';
import Btn from '../Btn';
import SpaceMaker from '../SpaceMaker';
import { LabelNavigationProp, LabelRouteProp } from '../../App';
import { useFocusEffect } from '@react-navigation/native';


type LabelProp = {
    navigation: LabelNavigationProp;
    route: LabelRouteProp;
}

type Color = {
    hue: number,
    saturation: number,
    lightness: number,
}
type Label = {
    _id: string;
    access: string;
    color: Color;
    name: string;
};

//! Main 
const Label = ({ navigation, route }: LabelProp) => {
    // const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const [labels, setLabels] = useState([])

    // useFocusEffect(() => {
    //     const getLabels = async () => {
    //         const response = await post({}, 'label/get-all', {
    //             headers: {
    //                 'Authorization': `Bearer ${authCtx.token}`
    //             }
    //         });
    //         console.log(response.labels)
    //         setLabels(response.labels);
    //     };
    //     getLabels();
    // }, []);
    useFocusEffect(useCallback(() => {
        const getLabels = async () => {
            const response = await post({}, 'label/get-all', {
                headers: {
                    'Authorization': `Bearer ${authCtx.token}`
                }
            });
            console.log('---------=-=-=-=----=')
            console.log(response.labels.length)
            // console.log(response.labels)
            setLabels(response.labels);
        };
        getLabels();
    }, []))

    function handleAddLabel() {
        navigation.navigate('AddLabel');
    }

    function renderItem({ item }: { item: Label }) {
        const isCustom = item.access !== 'ANY'
        return (
            <View style={[styles.row, styles.item]}>
                <View style={[styles.flex6, styles.labelWrapper]}>
                    <View style={[styles.label, { backgroundColor: `hsla(${item.color.hue}, ${item.color.saturation}%, ${item.color.lightness}%, 0.22)` }]}>
                        <Text style={[styles.labelText, { color: `hsl(${item.color.hue}, ${item.color.saturation}%, ${item.color.lightness}%)` }]}>{item.name}</Text>
                    </View>
                </View>
                <View style={styles.flex4}>
                    <Text style={[styles.centerTxt, { textTransform: 'uppercase', fontFamily: 'Poppins-Regular', fontWeight: '700' }]}>{isCustom ? 'custom' : item.access}</Text>
                </View>
                <View style={styles.flex5}>
                    <Text style={[styles.centerTxt, { fontFamily: 'Poppins-Regular', fontSize: 15 }]}>{`hsl(${item.color.hue}, ${item.color.saturation}, ${item.color.lightness})`}</Text>
                </View>
                <Pressable style={styles.flex2} onPress={() => { }}><Icon style={styles.centerTxt} name='filter-list' size={28} /></Pressable>
            </View>
        );

    }

    return (
        <View style={styles.Root}>
            <ScreenTitle size={22} renderBackIcon={true} backAction={() => navigation.goBack()} backIcon={<SVGIcons SvgSrc={LeftArrow} fill='#ececef8c' />}>Label</ScreenTitle>
            <View style={styles.row}>
                <View style={styles.flex6}><Text style={[styles.centerTxt, styles.heading]}>Name</Text></View>
                <View style={styles.flex4}><Text style={[styles.centerTxt, styles.heading]}>Type</Text></View>
                <View style={styles.flex5}><Text style={[styles.centerTxt, styles.heading]}>Color</Text></View>
                <View style={styles.flex2}><Text style={[styles.centerTxt, styles.heading]}>Menu</Text></View>
            </View>
            <SpaceMaker custom={{ height: 24 }} />
            <FlatList data={labels} renderItem={renderItem} keyExtractor={(item) => item._id} />
            <View style={styles.addBtn}>
                <BlurView overlayColor="transparent" style={styles.addBtnBlur} blurType="dark" blurRadius={10} blurAmount={15} />
                <Btn label={<Icon name='add' size={28} color="#ececef9c" />} onTap={handleAddLabel} bg='#ececef9c' type='none' txtSize={18} customStyle={{ height: 45 }} />
            </View>
        </View>
    )
}

export default Label

const styles = StyleSheet.create({
    Root: {
        flex: 1,
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
    },
    item: {
        marginBottom: 22,
    },
    flex6: {
        flex: 5,
    },
    heading: {
        fontSize: 17,
        fontFamily: 'Inika-Bold',
    },
    centerTxt: {
        ...CenterHorizontal,
        ...CenterVertical
    },
    flex4: {
        flex: 4,
    },
    flex5: {
        flex: 4,
    },
    flex2: {
        flex: 2,
    },
    labelWrapper: {
        // flex: 1.5,
        // marginRight: 6,
    },
    label: {
        width: 125,
        padding: 8,
        borderRadius: 6,
        ...CenterHorizontal,
    },
    labelText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    addBtnBlur: {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#ececef2c',
        height: '100%',
    },
    addBtn: {
        position: 'absolute',
        borderRadius: 50,
        overflow: 'hidden',
        bottom: 70,
        right: 25,
        width: 45,
        height: 45,
    },
})