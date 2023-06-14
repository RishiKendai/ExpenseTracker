import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'

/// Package
import { useNavigation } from '@react-navigation/native'
import BackIcon from '../assets/images/leftArrow.svg';
import Icon from 'react-native-vector-icons/Feather';
import EmptyImage from '../assets/images/empty_proof.svg'
/// Components

/// Types
import { PreviewXpnseScreenRouteProp, PreviewXpnseScreenNavigationProp } from '../App'
import ScreenTitle from './ScreenTitle';
import SpaceMaker from './SpaceMaker';
import Colors from '../utils/colors';
import { CenterHorizontal } from '../utils/GlobalStyles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
type PreviewXpnseProps = {
    route: PreviewXpnseScreenRouteProp;
    navigation: PreviewXpnseScreenNavigationProp;
};

/// FORMAT DATE
function unixToDateTime(timeStamp: string) {
    const dateTime = new Date(timeStamp);
    const date = dateTime.getDate().toString().padStart(2, '0');
    const month = dateTime.getMonth().toString().padStart(2, '0');
    const year = dateTime.getFullYear();
    const formatedDate = `${date}-${month}-${year}`
    const hour = (dateTime.getHours() % 12 || 12).toString().padStart(2, '0')
    const min = dateTime.getMinutes().toString().padStart(2, '0')
    const meridiem = dateTime.getHours() >= 12 ? 'PM' : 'AM'
    const formatedTime = `${hour}:${min} ${meridiem}`
    return `${formatedDate}  ${formatedTime}`





}
//>> Main
const PreviewXpnse: React.FC<PreviewXpnseProps> = ({ navigation, route }) => {
    const { item } = route.params;

    function handleNavigation() {
        navigation.goBack();
    }
    function handleEdit() {

    }

    async function downloadTransaction() {
        const directoryPath = Platform.OS === 'android' ? '/storage/emulated/0/Download/' : 'Download';
        const pdf = `
    <style>
    .text {
        font-size: 1em;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: left;
    }

    table {
        border-spacing: 15px;
    }

    .img {
        object-fit: cover;
        height: 180px;
        width: 180px;
        border-radius: 6px;

    }
</style>
<table>
<tr class="tr">
    <th class="text">Transaction ID</th>
    <td class="text">${item._id}</td>
</tr>
<tr>
    <th class="text">paid to</th>
    <td class="text">${item.payeeName}</td>
</tr>
<tr>
    <th class="text">Transaction date</th>
    <td class="text">${new Date(item.paidAt).toLocaleString()}</td>
</tr>
<tr>
    <th class="text">Spend to</th>
    <td class="text">${item.label.name}</td>
</tr>
<tr>
    <th class="text">Amount</th>
    <td class="text">${item.amount}</td>
</tr>
<tr>
    <th class="text">Notes</th>
    <td class="text">${item.note}</td>
</tr>
<tr>
    <td colspan="2">
        <img class="img" src="${item.proof.uri}" />
    </td>
</tr>
</table>
`
        let options = {
            html: pdf,
            fileName: `transaction-${item._id}`,
            directory: 'Download',
            width: 595,
            height: 842,
            base64: true,
        };
        let file = await RNHTMLtoPDF.convert(options)
        const filePath = RNFS.DownloadDirectoryPath + '/tests.pdf'
        console.log('-----------------------------------------')
        // console.log(RNFetchBlob.fs.dirs.DownloadDir)
        console.log('-----------------------------------------')
        if (file.base64 === undefined) file.base64 = ''
        RNFS.writeFile(filePath, file.base64, 'base64').then((success) => {
            console.log('FILE WRITTEN!');
        })
            .catch((err) => {
                console.log(err.message);
            });
        console.log('RNHTMLtoPDF ', RNHTMLtoPDF)
        console.log('-----------------------------------------')
        alert(file.filePath);

    }
    return (
        <View style={styles.Root}>
            <ScreenTitle renderBackIcon={true} backAction={handleNavigation} center={true} color='#eee' backIcon={<BackIcon />} size={22}>Transaction Details</ScreenTitle>
            <View style={styles.BtnWrapper}>
                {/* EDIT BUTTON */}
                <Pressable onPress={handleEdit} style={[styles.Btn, styles.EditBtn]}>
                    <Icon name='edit' size={22} color="#dcdcdf" />
                    {/* <Text style={{ color: '#fff' }}>Edit</Text> */}
                </Pressable>
                {/* DOWNLOAD */}
                <Pressable onPress={downloadTransaction} style={[styles.Btn, styles.DownloadBtn]}>
                    <Icon name='download' size={22} color="#dcdcdf" />
                    {/* <Text style={styles.DownloadText}>Download</Text> */}
                </Pressable>
            </View>
            {/* TRANSACTION ID */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Transaction ID</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <Text style={styles.RowRight}>{item._id}</Text>
            </View>
            {/* PAID TO */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Paid To</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <Text style={styles.RowRight}>{item.payeeName}</Text>
            </View>
            {/* TRANSACTION DATE */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Transaction Date</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <Text style={[styles.RowRight, { textTransform: 'uppercase' }]}>{unixToDateTime(item.paidAt)}</Text>
            </View>
            {/* LABEL */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Spent For:</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <View style={styles.RowRight}>
                    <View style={[styles.Label, { backgroundColor: `hsla(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%, 0.22)` }]}>
                        <Text style={[styles.LabelText, { color: `hsl(${item.label.color.hue}, ${item.label.color.saturation}%, ${item.label.color.lightness}%)` }]}>{item.label.name}</Text>
                    </View>
                </View>
            </View>
            {/* AMOUNT */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Amount</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <Text style={styles.RowRight}>₹ {item.amount}</Text>
            </View>
            {/* NOTES */}
            <View style={styles.Row}>
                <Text style={styles.RowLeft}>Notes</Text>
                <SpaceMaker custom={{ width: 10 }} />
                <View style={styles.RowRight}>
                    <ScrollView style={{ height: 50 }}>
                        <Text>{item.note}</Text>
                    </ScrollView>
                </View>
            </View>
            {/* PROOF */}
            <View style={{ ...CenterHorizontal, marginBottom: 10 }}><Text style={styles.ProofText}>Proof</Text></View>
            {item.proof === null
                ? <EmptyImage style={styles.Proof} />
                : <Image source={item.proof} style={styles.Proof} />
            }
        </View>
    );
}

export default PreviewXpnse

const styles = StyleSheet.create({
    Root: {
        flex: 1,
    },
    BtnWrapper: {
        flexDirection: 'row',
        paddingRight: 16,
        gap: 12,
    },
    Btn: {
        padding: 8,
        borderRadius: 6,
    },
    EditBtn: {
        backgroundColor: Colors.accent500,
        marginLeft: 'auto',
    },
    DownloadBtn: {
        backgroundColor: Colors.success,
    },
    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginVertical: 17,
    },
    RowLeft: {
        flex: 1,
        color: '#ececefe9',
        fontFamily: 'Poppins-Black',
        fontSize: 18,
    },
    RowRight: {
        flex: 2,
        fontSize: 16,
        fontFamily: 'Poppins-Black',
        textTransform: 'capitalize',
        color: '#ececefa3',
    },
    Label: {
        marginRight: 'auto',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    LabelText: {
        fontSize: 16,
        textTransform: 'capitalize',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    ProofText: {
        color: '#ececefe9',
        fontFamily: 'Poppins-Black',
        fontSize: 18,
    },
    Proof: {
        width: 200,
        height: 200,
        ...CenterHorizontal,
        borderRadius: 16,
    },
})