import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Btn from './Btn'
import { BlurView } from "@react-native-community/blur";
import Icon from 'react-native-vector-icons/MaterialIcons';


type AddBtnProp = {
    onPress: () => void;
}
const AddBtn = ({ onPress }: AddBtnProp) => {
    return (
        <View style={styles.addBtn}>
            <BlurView overlayColor="transparent" style={styles.addBtnBlur} blurType="dark" blurRadius={10} blurAmount={15} />
            <Btn label={<Icon name='add' size={28} color="#ececef9c" />} onTap={onPress} bg='#ececef9c' type='none' txtSize={18} customStyle={{ height: 45 }} />
        </View>
    )
}

export default AddBtn;

const styles = StyleSheet.create({
    addBtnBlur: {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#1d1d1f',
        height: '100%',
    },
    addBtn: {
        position: 'absolute',
        zIndex: 2,
        borderRadius: 50,
        overflow: 'hidden',
        bottom: 70,
        right: 25,
        width: 45,
        height: 45,
    },

})