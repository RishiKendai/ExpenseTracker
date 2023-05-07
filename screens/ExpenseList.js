import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import ScreenTitle from '../components/ScreenTitle';

function DailyExpense() {
  return (
    <SafeAreaView style={ styles.root }>
      <ScreenTitle size={22}>Expense List</ScreenTitle>
      <View style={styles.body}></View>
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