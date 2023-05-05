import { View, Text, StyleSheet } from 'react-native';
import { CenterHorizontal } from "../utils/GlobalStyles";

type ToastProp = {
    type: string,
    text1?: string,
    text2?: string,
    duration?: number,
};

function Toast({ type, text1 = '', text2 = '', duration }: ToastProp) {
    function setToastStyle(type: string) {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#2ECC71'
                };
            case 'error':
                return {
                    backgroundColor: '#ff4c4c'
                };
        }
    }

    function setToastText1(type: string) {
        switch (type) {
            case 'success':
                return {
                    color: '#FFFFFF'
                };
            case 'error':
                return {
                    color: '#f0f0f0'
                };
        }
    }

    return (
        <View style={[styles.Toast, { ...setToastStyle(type) }]}>
            {text1 && <Text style={[styles.ToastHead, { ...setToastText1(type) }]}>{text1}</Text>}
            {text2 && <Text>{text2}</Text>}
        </View>
    );
}

export default Toast;

const styles = StyleSheet.create({
    Toast: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
        top: 20,
        left: '50%',
        marginLeft: -75,
        position: 'absolute',
        zIndex: 1,
    },
    ToastHead: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
});