import { View } from 'react-native';

function Line({ customStyle }: {customStyle: any}) {
// function Line({ customStyle }: {customStyle: ViewStyle}) {
    return (
        <View style={ [{ ...customStyle }] }>
        </View>
    );
}
export default Line;