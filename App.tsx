/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Colors from './utils/colors';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from '@react-native-community/blur';
import ArrowSwitchSvg from './assets/images/arrowSwitch.svg';
import WalletSvg from './assets/images/wallet.svg';
import FileShareSvg from './assets/images/fileShare.svg';
import ProfileSvg from './assets/images/profile.svg';
import DailyExpense from './screens/DailyExpense';
import ExpenseList from './screens/ExpenseList';
import CollaborativeExpense from './screens/CollaborativeExpense';
import Settings from './screens/Settings';
import Login from "./screens/Login";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import Spinner from "./components/Spinner";
import Add from "./components/DailyExpense/Add";
import QRScannerScreen from "./screens/QRScannerScreen";
import SVGIcons from './utils/SVGIcons';



export type RootStackParamList = {
  Login: {};
  BottomNavigation: {};
  AddDailyExp: {};
  QRScannerScreen: undefined;
  DailyExpense: undefined;
  Expenses: undefined;
  CollaborativeExpense: undefined;
  Settings: undefined;
};


// Define the NAVIGATION prop type for each screen in the navigator
export type DailyExpenseNavigationProp = BottomTabNavigationProp<RootStackParamList, 'DailyExpense'>;
export type ExpensesNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Expenses'>;
export type CollaborativeExpenseNavigationProp = BottomTabNavigationProp<RootStackParamList, 'CollaborativeExpense'>;
export type SettingsNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Settings'>;
export type QRScannerNavigationProp = BottomTabNavigationProp<RootStackParamList, 'QRScannerScreen'>;


// Define the ROUTE prop type for each screen in the navigator
export type DailyExpenseRouteProp = RouteProp<RootStackParamList, 'DailyExpense'>;
export type ExpensesRouteProp = RouteProp<RootStackParamList, 'Expenses'>;
export type CollaborativeExpenseRouteProp = RouteProp<RootStackParamList, 'CollaborativeExpense'>;
export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>;
export type QRScannerRouteProp = RouteProp<RootStackParamList, 'QRScannerScreen'>;


export type DailyExpenseProps = {
  navigation: DailyExpenseNavigationProp;
  route: DailyExpenseRouteProp;
};

export type ExpensesProps = {
  navigation: ExpensesNavigationProp;
  route: ExpensesRouteProp;
};

export type CollaborativeExpenseProps = {
  navigation: CollaborativeExpenseNavigationProp;
  route: CollaborativeExpenseRouteProp;
};

export type SettingsProps = {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootStackParamList>();



//* Navigation theme
const MyTheme = {
  dark: true,
  colors: {
    primary: Colors.secondary500,
    card: 'transparent',
    border: 'transparent',
    text: 'white',
    background: 'transparent',
    notification: '#FF0000'
  },
};

const TabBarBackground = () => (
  <BlurView overlayColor="transparent" style={styles.tabBarBlur} blurType="dark" blurRadius={13} blurAmount={15} />
);

interface TabBarIconProps {
  focused?: boolean;
  size?: number;
  color: string;
};



// Bottom Navigation
function BottomNavigation() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { position: 'absolute', height: 60, padding: 9 },
      tabBarBackground: TabBarBackground,
      tabBarInactiveTintColor: '#8F8E8F',
    }}>
      <BottomTabs.Screen
        name="DailyExpense"
        component={DailyExpense}
        options={{
          title: 'Daily Expense',
          tabBarLabel: 'Daily Expense',
          tabBarIcon: ({ color }: TabBarIconProps) => <SVGIcons SvgSrc={ArrowSwitchSvg} fill={color} />
        }}
      />
      <BottomTabs.Screen
        name="Expenses"
        component={ExpenseList}
        options={{
          title: 'Expense',
          tabBarLabel: 'Expense',
          tabBarIcon: ({ color }: TabBarIconProps) => <SVGIcons SvgSrc={WalletSvg} fill={color} />
        }}
      />
      <BottomTabs.Screen
        name="CollaborativeExpense"
        component={CollaborativeExpense}
        options={{
          title: 'Collaborative Expense',
          tabBarLabel: 'Collaborative Expense',
          tabBarIcon: ({ color }: TabBarIconProps) => <SVGIcons SvgSrc={FileShareSvg} fill={color} />,
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }: TabBarIconProps) => <SVGIcons SvgSrc={ProfileSvg} fill={color} />
        }}
      />
    </BottomTabs.Navigator>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="AddDailyExp" component={Add} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
    </Stack.Navigator>
  );
}


function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer theme={MyTheme}>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);
  if (isTryingLogin) {
    return (
      <Spinner size={50} msg='Loading Content...' />
    );
  }
  return <Navigation />;
}


// Main Function
export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary500} />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </SafeAreaView>
  );
}

//  Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary500,
  },
  tabBarBlur: {
    backgroundColor: '#0d0d0d3c',
    height: 50,
    paddingVertical: 52,
    width: '100%',
  },
});
