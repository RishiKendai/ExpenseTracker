import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import SpaceMaker from "../SpaceMaker";
import Colors from "../../utils/colors";


//! Main
const Xpnse = ({ dailyXpnse }) => {
    console.log('--------------------------');
    console.log(dailyXpnse.length);

    function previewXpnse(item) {
        // add preview screen
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



    return dailyXpnse.length > 0
        ? (
            <View>
                <SpaceMaker custom={ { height: 24 } } />
                <FlatList data={ dailyXpnse } renderItem={ renderItem } keyExtractor={ (item) => item._id }
                    ListFooterComponent={ () => <SpaceMaker custom={ { height: 120 } } /> }
                    alwaysBounceVertical={ true }
                    showsVerticalScrollIndicator={ false }
                />
            </View>
        ) : (<View><Text>none</Text></View>
        );
};
export default Xpnse;

const styles = StyleSheet.create({
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
    }

});