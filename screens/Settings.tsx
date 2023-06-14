import { Text, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import Btn from '../components/Btn';
import { AuthContext } from "../store/authContext";
import Line from '../components/Line';
import { SettingsNavigationProp, SettingsRouteProp } from '../App';
import SpaceMaker from '../components/SpaceMaker';


type SettingsProps = {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
};


function Settings({ navigation, route }: SettingsProps) {

  const authCtx = useContext(AuthContext);

  function handleLogout() {
    authCtx.logout();
  }
  function handleAccount() { }
  function handleNotifications() { }
  function handleLabel() {
    navigation.navigate('Label')
  }
  function handleSetCurrency() { }
  function handleProfile() { }

  return (
    <SafeAreaView style={styles.root}>
      <ScreenTitle size={22} >Settings</ScreenTitle>
      <ScrollView style={styles.body}>
        {/* <View style={styles.body}> */}

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
        <SpaceMaker custom={{ height: 70 }} />
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
    paddingHorizontal: 18,
  }
});