import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

//! Main function 
function QRScannerScreen({ navigation }) {

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

  const onSuccess = async (e) => {
    console.log('adai ', e.data);
    // Linking.openURL(e.data)
    const rawData = e.data.split('?')[1];
    const abstractedData = rawData.split('&');
    // const upiObject: MyObject = {}
    const upiObject = {};
    for (const item of abstractedData) {
      const [key, value] = item.split("=");
      upiObject[key] = value;
    }
    const pa = upiObject.pa;
    const pn = upiObject.pn;
    console.log(upiObject.pa);

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
