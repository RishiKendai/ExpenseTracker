import { View, Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Spinner from "./Spinner";
import { CenterHorizontal, CenterVertical } from '../utils/GlobalStyles';
import Colors from '../utils/colors';

type BtnProp = {
    label: React.ReactNode | string,
    type: string,
    onTap: (event: GestureResponderEvent) => void,
    bg: string,
    // customStyle: ViewStyle,
    customStyle: any,
    isLoading?: boolean,
    txtSize: number,
    spinnerColor?: string,
    centerHorizontal?: any,
};

function Btn({ label, type, onTap, bg, customStyle, centerHorizontal = true, txtSize, isLoading = false, spinnerColor, }: BtnProp) {

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
        <Pressable style={[styles.Button, { ...customStyle }, { ...getOuterType(type) }]} onPress={onTap}>
            <View style={[centerHorizontal && CenterHorizontal, CenterVertical]}>
                {
                    isLoading
                        ? <Spinner color={spinnerColor ? spinnerColor : Colors.accent500} size={30} msg={undefined} />
                        : <Text style={[styles.Label, { fontSize: txtSize }, { ...getTextType(type) }]}>{label}</Text>
                }
            </View>
        </Pressable >
    );
};
export default Btn;

const styles = StyleSheet.create({
    Button: {
        borderRadius: 6,
    },
    Label: {
        fontFamily: 'Montserrat-Black',
    },
    OutlineButton: {},
    FilledButton: {},
});