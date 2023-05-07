import { Text, Linking, SafeAreaView, StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import SpaceMaker from "../components/SpaceMaker";
import Btn from "../components/Btn";
import PlusIcon from '../assets/images/plussvg.svg';
import { initiateTransaction } from 'react-native-allinone-upi';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Xpnse from '../components/DailyExpense/Xpnse';
import Insights from '../components/DailyExpense/Insights';

import { BlurView } from "@react-native-community/blur";
import { useFocusEffect } from '@react-navigation/native';
import Line from "../components/Line";
import { CenterHorizontal } from "../utils/GlobalStyles";
import QRScannerScreen from "./QRScannerScreen";
import SVGIcons from '../utils/SVGIcons';

import { DailyExpenseNavigationProp, DailyExpenseRouteProp } from '../App';
import { post } from '../utils/magicBox';
import { AuthContext } from '../store/authContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Add from '../components/DailyExpense/Add';

// import { RootStackParamList } from '../App';

type DailyExpenseProps = {
  navigation: DailyExpenseNavigationProp;
  route: DailyExpenseRouteProp;
};

//! Main function 
function DailyExpense({ navigation, route }: DailyExpenseProps) {
  const Tab = createMaterialTopTabNavigator();

  /// USE STATA
  const [dailyXpnse, setDailyXpnse] = useState<Object[]>([]);
  const [askOptions, setAskOptions] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString())


  /// USE CONTEXT
  const authCtx = useContext(AuthContext)

  /// INITIAL RENDER
  const fetchData = async () => {
    const response = await post(
      { uid: authCtx.token, currdate: new Date().toISOString() },
      'daily-expense/',
      {}
    );
    if (response.status === 'success') {
      setDailyXpnse(response.data);
    }
  };
  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))



  const handleAddExp = useCallback(() => {
    setAskOptions((prev) => !prev);
  }, []);

  function handleAddManual() {
    // handleAddExp()
    navigation.navigate('AddDailyExp', { xpenseType: 'daily' })
    setAskOptions((prev) => !prev);
  }
  function handleScan() {
    navigation.navigate('QRScannerScreen');
  }


  function handleSearch() {

  }

  const IconAndDate = () => {
    return (
      <View style={styles.iconAndDate}>
        <BlurView overlayColor="transparent" style={styles.iconDateBlur} blurType="dark" blurRadius={10} blurAmount={15} />
        <Icon name="search" size={25} color="#ececef9c" />
        <Btn txtSize={16} label={date} bg='#ececefac' customStyle={{ ...CenterHorizontal, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 50 }} type='none' onTap={handleSearch} />
      </View>
    );
  }

  const RenderXpnseScreen = useCallback(() => {
    return <Xpnse dailyXpnse={dailyXpnse} />
  }, [dailyXpnse])

  return (
    <SafeAreaView style={styles.root}>
      <ScreenTitle size={22} >Daily Expenses</ScreenTitle>
      <IconAndDate />
      <View style={styles.body}>
        <Tab.Navigator screenOptions={{ tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 16, fontFamily: 'Inika-Regular' } }} initialRouteName='Xpense'>
          <Tab.Screen options={{ tabBarLabel: 'Expense', }} name="Xpense" component={RenderXpnseScreen} />
          <Tab.Screen name="Insights" component={Insights} />
        </Tab.Navigator>
        {/* Add Button */}
        <View style={styles.addBtn}>
          <BlurView overlayColor="transparent" style={styles.addBtnBlur} blurType="dark" blurRadius={10} blurAmount={15} />
          <Btn label={<Icon name='add' size={28} color="#ececef9c" />} onTap={handleAddExp} bg='#ececef9c' type='none' txtSize={18} customStyle={{ height: 45 }} />
          {/* </BlurView> */}
        </View>
        {/* Ask Option */}
        {
          askOptions
            ?
            <View style={styles.askOptions}>
              <BlurView overlayColor="transparent" style={styles.optionsBlur} blurType="dark" blurRadius={6} blurAmount={25} />
              <Pressable onPress={handleAddManual}><Text style={styles.optionText}>Add Manually</Text></Pressable>
              <Line customStyle={{ ...CenterHorizontal, height: 1, width: '80%', backgroundColor: '#1616175c' }} />
              <Pressable onPress={handleScan}><Text style={styles.optionText}>Scan</Text></Pressable>
            </View>
            : ''
        }
      </View>
    </SafeAreaView>
  );
}
export default DailyExpense;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
  },
  iconAndDate: {
    position: 'absolute',
    zIndex: 3,
    bottom: 70,
    left: '50%',
    marginLeft: -50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 50,
    width: 120,
    height: 38,
    overflow: 'hidden',
  },
  iconDateBlur: {
    position: 'absolute',
    backgroundColor: '#cececf2c',
    height: '100%',
    width: 120,
  },
  list: {
    backgroundColor: '#ffffff8c',
    borderRadius: 7,
    marginVertical: 12,
    padding: 16,
  },
  item: {
    color: '#161617',
    fontSize: 18,
    fontFamily: 'Inika-Regular',
  },
  addBtnBlur: {
    width: '100%',
    position: 'absolute',
    backgroundColor: '#ececef2c',
    height: '100%',
  },
  addBtn: {
    position: 'absolute',
    borderRadius: 50,
    overflow: 'hidden',
    bottom: 70,
    right: 25,
    width: 45,
    height: 45,
  },
  optionsBlur: {
    position: 'absolute',
    backgroundColor: '#ececef4c',
    height: '100%',
    width: '100%',
  },
  askOptions: {
    position: 'absolute',
    borderRadius: 16,
    bottom: 120,
    overflow: 'hidden',
    right: 25,
  },
  optionText: {
    fontSize: 18,
    // color: '#161617',
    color: '#020202',
    fontFamily: 'Montserrat-Black',
    fontWeight: '600',
    padding: 12,
  },
});