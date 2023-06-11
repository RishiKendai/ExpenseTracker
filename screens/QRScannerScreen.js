import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import RNUPISDK from 'react-native-upier';

//! Main function 
function QRScannerScreen({ navigation, route }) {
  const {type} = route.params

  // useEffect(() => {
  //   const handleDeepLink = (event) => {
  //     const { url } = event;
  //     console.log('url ', url)
  //     const successKeyword = 'success'; // Replace with the success keyword in the deep link or callback URL
  //     const failureKeyword = 'failure'; // Replace with the failure keyword in the deep link or callback URL

  //     if (url.includes(successKeyword)) {
  //       Alert.alert('Payment Successful hure');
  //     } else if (url.includes(failureKeyword)) {
  //       Alert.alert('Payment Failed hure');
  //     }
  //   };

  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeAllListeners('url', handleDeepLink);
  //   };
  // }, []);


  // const onSuccess = (e: any) => {
  const successCallback = (data) => {
    console.log('success');
    console.log(data);
  };

  function failureCallback(data) {
    console.log('failure');
    console.log(data);
  }

  const onSuccess = async (e) => {
    const upiId = encodeURIComponent(`${e.data}&cu=INR`);
    const rawData = e.data.split('?')[1];
    const abstractedData = rawData.split('&');
    const upiObject = {};
    for (const item of abstractedData) {
      const [key, value] = item.split("=");
      upiObject[key] = value;
    }
    const pa = upiObject.pa;
    const pn = upiObject.pn;
    navigation.navigate('UPIPay', { type: type, data: e.data });

    // RNUPISDK.initializePayment(
    //   {
    //     pa: pa, // or can be xxx@ybl or mobileNo@upi
    //     pn: pn,
    //     am: '1',
    //     tf: 'acddsefid',
    //     cu: 'INR',
    //   },
    //   successCallback,
    //   failureCallback
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
      reactivateTimeout={ 100 }
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
