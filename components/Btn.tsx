import { View, Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Spinner from "./Spinner";
import { CenterHorizontal, CenterVertical } from '../utils/GlobalStyles';

type BtnProp = {
    label: React.ReactNode | string,
    type: string,
    onTap: (event: GestureResponderEvent) => void,
    bg: string,
    // customStyle: ViewStyle,
    customStyle: any,
    isLoading?: boolean,
    txtSize: number,
};

function Btn({ label, type, onTap, bg, customStyle, txtSize, isLoading = false }: BtnProp) {

    function getOuterType(btnType: string) {
        switch (btnType) {
            case 'filled':
                return {
                    backgroundColor: bg,
                };
            case 'outline':
                return {
                    borderColor: bg,
                    borderWidth: 1,
                };
            case 'none':
                return {
                    backgroundColor: 'transparent',
                };
        }
    }
    function getTextType(btnType: string) {
        switch (btnType) {
            case 'filled':
                return {
                    color: '#efefec',
                };
            case 'outline':
                return {
                    color: bg
                };
            case 'none':
                return {
                    color: bg
                };
        }
    }

    return (
        <Pressable style={[{ ...customStyle }, { ...getOuterType(type) }, styles.Button]} onPress={onTap}>
            <View style={[CenterHorizontal, CenterVertical]}>
                {
                    isLoading
                        ? <Spinner size={10} msg='' />
                        : <Text style={[styles.Label, { fontSize: txtSize }, { ...getTextType(type) }]}>{label}</Text>
                }
            </View>
        </Pressable >
    );
};
export default Btn;

const styles = StyleSheet.create({
    Button: {
        // paddingHorizontal: 13,
        // height: 50,
        borderRadius: 6,
    },
    Label: {
        fontFamily: 'Montserrat-Black',
    },
    OutlineButton: {},
    FilledButton: {},
});