import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import RazorpayCheckout from 'react-native-razorpay';
import { initiateTransaction } from 'react-native-allinone-upi';

// import RNUpiPayment from 'react-native-upi-gateway';

// interface MyObject {
//   [key: string]: any;
// }
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
    console.log(e.data);
    const rawData = e.data.split('?')[1];
    const abstractedData = rawData.split('&');
    // const upiObject: MyObject = {}
    const upiObject = {};
    for (const item of abstractedData) {
      const [key, value] = item.split("=");
      upiObject[key] = value;
    }
    console.log(upiObject.pa);


    // const options = {
    //   description: 'Payment',
    //   image: 'https://i.imgur.com/3g7nmJC.png',
    //   currency: 'INR',
    //   key: 'rzp_test_W0DRKPkBYY9OWX', // Replace with your Razorpay API key
    //   amount: 100,
    //   name: 'Payment',
    //   notes: {
    //     merchant_order_id: '12345', // Add any additional notes or order ID
    //   },
    //   method: {
    //     netbanking: 0,
    //     upi: 1,
    //     wallet: 0,
    //   },
    //   external: {
    //     wallets: ['paytm'], // Include any specific wallets you want to show
    //   },
    //   flows: [ "qr"],
    //   apps: ["google_pay", "phonepe"],
    //   collect: {
    //     vpa: upiObject.pa, // The UPI ID to collect the payment
    //   },
    // };
    // RazorpayCheckout.open(options).then((data) => {
    //   // handle success
    //   Alert.alert(`Success: ${'done da ', data.razorpay_payment_id}`);
    // }).catch((error) => {
    //   // handle failure
    //   Alert.alert(`Error da: ${error.code} | ${error.description}`);
    //   console.log(error.description)
    // });
    initiateTransaction({
      upi: 'beikeerthu5698-1@okicici',  // Required
      transactionId: '190',  // Required
      currency: 'INR',   // Currency Code (Required)
      merchantCategoryCode: '1234',  // Four digit Code. (Required)
      payeeName: 'Name of the Payee', // Required 
      amount: '1',  // Amount must be in String and must be greater than 1.00 (Required)
      note: 'test', // Additional Notes or description (Optional)
    })
      .then((res) => {
        console.log(res, 'RESPONSE');
      })
      .catch((e) => {
        console.log(e.message, 'ERROR');
      });
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
      reactivateTimeout={100}
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
