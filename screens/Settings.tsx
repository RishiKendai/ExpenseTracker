import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import Btn from '../components/Btn';
import { AuthContext } from "../store/authContext";


function DailyExpense() {
  const authCtx = useContext(AuthContext);

  function handleLogout() {
    authCtx.logout();
  }
  return (
    <SafeAreaView style={styles.root}>
      <ScreenTitle size={22} >Settings</ScreenTitle>
      <View style={styles.body}>

        <Btn label='Logout' onTap={handleLogout} bg='#FF3C2B' type='none' txtSize={18} customStyle={{ height: 50, marginRight: 'auto', paddingHorizontal: 1 }} />
      </View>
    </SafeAreaView>
  );
}
export default DailyExpense;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 18,
  }
});