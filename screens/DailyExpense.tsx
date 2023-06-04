import { Text, Linking, SafeAreaView, StyleSheet, View, FlatList, Pressable } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Xpnse from '../components/DailyExpense/Xpnse';
import Insights from '../components/DailyExpense/Insights';

import QRScannerScreen from "./QRScannerScreen";
import SVGIcons from '../utils/SVGIcons';

import Add from '../components/DailyExpense/Add';
import { useCallback } from 'react';

// import { RootStackParamList } from '../App';
import { DailyExpenseNavigationProp, DailyExpenseRouteProp } from '../App';


type DailyExpenseProps = {
    navigation: DailyExpenseNavigationProp;
    route: DailyExpenseRouteProp;
  };


//! Main function 
function DailyExpense({ navigation, route }: DailyExpenseProps) {
  const Tab = createMaterialTopTabNavigator();


  // const [datePicker, setDatePicker] = useState(new Date())




  const RenderXpnseScreen = useCallback(() => {
    return <Xpnse navigation={navigation} route={route} />
  },[])



  return (
    <SafeAreaView style={styles.root}>
      <ScreenTitle size={22} >Daily Expenses</ScreenTitle>
      <View style={styles.body}>
        <Tab.Navigator screenOptions={{ tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 16, fontFamily: 'Inika-Regular' } }} initialRouteName='Xpense'>
          <Tab.Screen options={{ tabBarLabel: 'Expense', }} name="Xpense" component={RenderXpnseScreen} />
          <Tab.Screen name="Insights" component={Insights} />
        </Tab.Navigator>
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
});