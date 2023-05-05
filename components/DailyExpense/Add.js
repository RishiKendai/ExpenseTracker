import { View, Text, StyleSheet, Pressable } from 'react-native';
import BackIcon from '../../assets/images/leftArrow.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from "../ScreenTitle";

function Add() {
    const navigation = useNavigation();

    const BackBtn = () => <Pressable onPress={ () => navigation.goBack() }><BackIcon /></Pressable>;
    return (
        <View style={ styles.Root }>
            <ScreenTitle size={ 22 } renderBackIcon={ true } center={ true } backIcon={ <BackBtn /> }>Add Expense</ScreenTitle>
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    Root: {
        flex: 1,
    }
});