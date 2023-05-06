import { Text, Linking, SafeAreaView, StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import SpaceMaker from "../components/SpaceMaker";
import Btn from "../components/Btn";
import PlusIcon from '../assets/images/plussvg.svg';
import { initiateTransaction } from 'react-native-allinone-upi';

import { BlurView } from "@react-native-community/blur";
// import { useNavigation } from '@react-navigation/native';
import Line from "../components/Line";
import { CenterHorizontal } from "../utils/GlobalStyles";
import QRScannerScreen from "./QRScannerScreen";
import SVGIcons from '../utils/SVGIcons';

import { DailyExpenseNavigationProp, DailyExpenseRouteProp } from '../App';
import { post } from '../utils/magicBox';

// import { RootStackParamList } from '../App';

type DailyExpenseProps = {
  navigation: DailyExpenseNavigationProp;
  route: DailyExpenseRouteProp;
};

//! Main function 
function DailyExpense({ navigation, route }: DailyExpenseProps) {
  const [ast, setAst] = useState<Object[]>([]);
  const [askOptions, SetAskOptions] = useState(false);

  useEffect(() => {
    const arr = [];
    for (let inc = 0; inc < 101; inc++) {
      arr.push(inc);
    }
    setAst(arr);
  }, []);
  // useEffect(()=>{
  //   async function fetchXpense(){
  //     console.log('hi')
  //     const response = await post({},'/daily-expense/')
  //     console.log(response)
  //   }
  //   fetchXpense();
  // },[])

  function handleAddExp() {
    SetAskOptions((prev) => !prev);
  }
  function handleAddManual() {
    navigation.navigate('AddDailyExp', {xpenseType: 'daily'})
  }
  function handleScan() {
    navigation.navigate('QRScannerScreen');
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScreenTitle size={22} >Daily Expenses</ScreenTitle>
      <View style={styles.body}>
        {/* <FlatList
          ListFooterComponent={() => <SpaceMaker custom={{ height: 50, width: 0 }} />}
          alwaysBounceVertical={true}
          data={ast}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (<View style={styles.list}><Text style={styles.item}>{item}</Text></View>)}
          keyExtractor={(item) => item.toString()}
        /> */}
        {/* Add Button */}
        <View style={styles.addBtn}>
          <BlurView overlayColor="transparent" style={styles.tabBarBlur} blurType="dark" blurRadius={23} blurAmount={22}>
            <Btn label={<SVGIcons SvgSrc={PlusIcon} fill='#fff' />} onTap={handleAddExp} bg='#0d0d0d3c' type='filled' txtSize={18} customStyle={{ height: 50 }} />
          </BlurView>
        </View>
        {/* Ask Option */}
        {
          askOptions
            ?
            <View style={styles.askOptions}>
              <BlurView overlayColor="transparent" style={styles.optionsBlur} blurType="light" blurRadius={12} blurAmount={11} />
              <Pressable onPress={handleAddManual}><Text style={styles.optionText}>Add Manually</Text></Pressable>
              <Line customStyle={{ ...CenterHorizontal, height: 1, width: '80%', backgroundColor: '#1616172c' }} />
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
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
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
  tabBarBlur: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  addBtn: {
    position: 'absolute',
    borderRadius: 50,
    overflow: 'hidden',
    bottom: 130,
    right: 20,
    width: 50,
    height: 50,
  },
  askOptions: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: '#ffffff7c',
    bottom: 140,
    overflow: 'hidden',
    right: 80,
  },
  optionText: {
    fontSize: 18,
    color: '#161617',
    fontFamily: 'Montserrat-Black',
    fontWeight: '600',
    padding: 12,
  },
  optionsBlur: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});