import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';


// import RNUpiPayment from 'react-native-upi-gateway';

// import RNUpiPayment from 'react-native-upi-payment';

// import OneUpi from 'one-react-native-upi';

// interface MyObject {
//   [key: string]: any;
// }
//! Main function 
function QRScannerScreen({ navigation }) {


  // const onSuccess = (e: any) => {
  const onSuccess = (e) => {
    // console.log(e.data)
    const rawData = e.data.split('?')[1];
    const abstractedData = rawData.split('&');
    // const upiObject: MyObject = {}
    const upiObject = {};
    for (const item of abstractedData) {
      const [key, value] = item.split("=");
      upiObject[key] = value;
    }
    console.log(upiObject);
    console.log(upiObject.pa);
    console.log(upiObject.pn);

    // RNUpiPayment.initializePayment({
    //   vpa: upiObject.pa, // or can be john@ybl or mobileNo@upi
    //   payeeName: upiObject.pn,
    //   amount: '1',
    //   transactionRef: 'aasf-332-aoei-fn'
    // }, (su) => console.log(su),
    //   (er) => console.log(er),
    // );

    // RNUpiPayment.initializePayment(
    //   {
    //     vpa: upiObject.pa, // or can be john@ybl or mobileNo@upi
    //     payeeName: upiObject.pn,
    //     amount: "1",
    //     transactionRef: "aasf-332-aoei-fn",
    //   },
    // (su: any) => console.log(su),
    // (er: any) => console.log(er),
    //   (su) => console.log(su),
    //   (er) => console.log(er),
    // );
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  function handleCancel() {
    navigation.goBack();
  }

  return (
    // <QRCodeScanner
    //   onRead={onSuccess}
    //   topContent={
    //     <Text style={styles.centerText}>Scan the UPI QR code</Text>
    //   }
    //   bottomContent={
    //     <View style={styles.bottomView}>
    //       <Text style={styles.centerText}>Please place the QR code inside the frame</Text>
    //     </View>
    //   }
    //   cameraStyle={{ height: '100%' }}
    //   showMarker={true}
    //   reactivate={true}
    //   flashMode={RNCamera.Constants.FlashMode.torch}
    //   reactivateTimeout={5000}
    //   markerStyle={{ borderColor: '#fff', borderRadius: 10 }}
    // />
    <QRCodeScanner
      onRead={ onSuccess }
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={ styles.centerText }>
          Scan your UPI QR code to pay your expense..
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={ styles.buttonTouchable } onPress={ handleCancel }>
          <Text style={ styles.buttonText }>Cancel</Text>
        </TouchableOpacity>
      }
    />
  );
}

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   bottomView: {
//     backgroundColor: '#161617',
//     height: 100,
//     justifyContent: 'center',
//   },
// });


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
export default QRScannerScreen;
