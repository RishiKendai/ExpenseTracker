import { Text, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import Btn from '../components/Btn';
import { AuthContext } from "../store/authContext";
import Line from '../components/Line';
import { SettingsNavigationProp, SettingsRouteProp } from '../App';
import SpaceMaker from '../components/SpaceMaker';
import { BlurView } from '@react-native-community/blur';
import Colors from '../utils/colors';
import { CenterHorizontal } from '../utils/GlobalStyles';

type SettingsProps = {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
};


function Settings({ navigation, route }: SettingsProps) {

  const authCtx = useContext(AuthContext);
  const [renderNotification, setRenderNotification] = useState(false)
  function handleLogout() {
    authCtx.logout();
  }
  function handleAccount() { }
  function handleNotifications() { }
  function handleLabel() {
    navigation.navigate('Label')
  }
  function handleSetCurrency() {
    setRenderNotification(true)
  }
  function handleProfile() { }

  function handleNotificationBack() {
    setRenderNotification(false)
  }
  return (
    <SafeAreaView style={styles.root}>
      {
        renderNotification ?
          <View style={styles.Absolute}>
            <View style={styles.OuterCard}>
              <BlurView overlayColor="transparent" style={styles.CardBlur} blurType="dark" blurRadius={6} blurAmount={5}>
                <View style={styles.Card}>
                  <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                    <Text style={styles.Title}>Attention!!</Text>
                    <Text style={styles.Message}>Currently, the currency option is available only in INR (Indian Rupees). However, we are working on to provide support for various currency options in the near future. Stay tuned for updates</Text>
                  </View>
                  <SpaceMaker custom={{ height: 15 }} />
                  <Line customStyle={{ height: 0.6, width: '100%', backgroundColor: '#2c2c2d4c' }} />
                  <SpaceMaker custom={{ height: 5 }} />
                  <Btn label='ok' onTap={handleNotificationBack} bg={Colors.dogerBlue500} customStyle={{ height: 35, }} type='none' txtSize={18} centerHorizontal={true} />
                </View>
              </BlurView>
            </View>
          </View>
          : ''
      }
      <ScreenTitle size={22} >Settings</ScreenTitle>
      <ScrollView style={styles.body}>
        <Btn label='Profile' onTap={handleProfile} bg='#cfcfcf' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        <Btn label='Set currency' onTap={handleSetCurrency} bg='#cfcfcf' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        <Btn label='Notifications' onTap={handleNotifications} bg='#cfcfcf' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        <Btn label='Label' onTap={handleLabel} bg='#cfcfcf' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        <Btn label='Account' onTap={handleAccount} bg='#cfcfcf' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        <Btn label='Logout' onTap={handleLogout} bg='#FF3C1B' type='none' txtSize={18} centerHorizontal={false} customStyle={{ height: 55, paddingHorizontal: 1 }} />
        <Line customStyle={{ height: 1, with: '90%', backgroundColor: '#e8e8ef1c' }} />
        {/* <SpaceMaker custom={{ height: 70 }} /> */}
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
export default Settings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
  },
  Absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardBlur: {
    backgroundColor: '#ffffff9d',
  },
  OuterCard: {
    overflow: 'hidden',
    borderRadius: 16,
    width: 320,
    height: 220,
  },
  Card: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  Title: {
    color: '#2c2c2d',
    fontSize: 22,
    ...CenterHorizontal,
    fontWeight: '600',
    marginBottom: 10,
  },
  Message: {
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 15,
    color: '#000',
  },
});