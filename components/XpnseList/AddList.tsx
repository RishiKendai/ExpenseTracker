import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image, ScrollView } from 'react-native';

import { AuthContext } from "../../store/authContext";
import { post } from "../../utils/magicBox";
import { BlurView } from '@react-native-community/blur';

/// COMPONENTS
import ScreenTitle from "../ScreenTitle";
import Input from "../Input";
import SpaceMaker from "../SpaceMaker";
import { CenterHorizontal, CenterVertical } from "../../utils/GlobalStyles";
import Colors from "../../utils/colors";
import Btn from "../Btn";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ToggleBtn from '../ToggleBtn';

/// TYPE
type AddListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddList'>;
/**
 * name isStarred target expnes amount
 */

type xpnseListStateProp = {
  name: string;
  isStarred: boolean;
  targetXpnse: boolean;
  amount: string;
};

type xpnseListActionProp = {
  type: string;
  payload: any;
};

type addListProps = {
  navigation: AddListScreenNavigationProp;
  renderComponent: Function;
}


const xpnseListState: xpnseListStateProp = {
  name: '',
  isStarred: false,
  targetXpnse: false,
  amount: '',
};

function xpnseListReducer(state: xpnseListStateProp, action: xpnseListActionProp) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'isStarred':
      return { ...state, isStarred: action.payload };
    case 'targetXpnse':
      return { ...state, targetXpnse: action.payload, amount: '' };
    case 'amount':
      return { ...state, amount: action.payload };
    default:
      return xpnseListState
  }
}

//>> MAIN FUNCTION
function AddList({ navigation, renderComponent }: addListProps) {
  const authCtx = useContext(AuthContext);
  /// USE STATES
  // const [xpnseList, setxpnseList] = useState<xpnseListProps>({ name: "", isStarred: false })
  const [xpnseList, xpnseListDispatch] = useReducer(xpnseListReducer, xpnseListState);
  const [isLoading, setIsLoading] = useState(false);



  /// FUNCTIONS
  async function handleAdd() {
    if (isLoading) return;
    xpnseList.amount === '' ? 0 : +xpnseList.amount;
    xpnseList.name = xpnseList.name.trim()
    setIsLoading(true);
    const response = await post(xpnseList, `expense-list/create/${authCtx.token}`, {});
    console.log(response);
    if (response.status === 'success') {
      setIsLoading(false)
      renderComponent((prev: any) => !prev);
    }
  }


  function handleBack() {
    renderComponent((prev: any) => !prev);
  }



  //>> RETURN 
  return (

    <BlurView overlayColor="transparent" style={styles.Root} blurType="dark" blurRadius={6} blurAmount={5}>
      <View style={styles.Root}>
        <View style={styles.Card}>
          <ScreenTitle size={22} color={Colors.accent500} renderBackIcon={false} center={true}>Add Expense</ScreenTitle>
          <SpaceMaker custom={{ height: 24 }} />
          <Input label="name" inputType="" keyType="default" action="name" onInput={xpnseListDispatch} data={xpnseList.name} />
          <SpaceMaker custom={{ height: 32 }} />
          <View style={styles.Wrapper}>

            <View style={styles.toggler}>
              <Text style={styles.StarTogglerText}>STAR IT</Text>
              {/* <ToggleBtn width={63} height={39} radius={35} onTap={xpnseListDispatch} action="isStarred" /> */}
              <ToggleBtn width={51} height={31} radius={27} onTap={xpnseListDispatch} action="isStarred" />
            </View>
            <View style={styles.toggler}>
              <Text style={styles.StarTogglerText}>Target Expense</Text>
              <ToggleBtn width={51} height={31} radius={27} onTap={xpnseListDispatch} action="targetXpnse" />
            </View>
          </View>
          <SpaceMaker custom={{ height: 32 }} />
          {xpnseList.targetXpnse ?
            <>
              <Input label="amount" inputType="" keyType="numeric" action="amount" onInput={xpnseListDispatch} data={xpnseList.amount.toString()} />
              <SpaceMaker custom={{ height: 32 }} />
            </>
            : ''
          }
          <View style={styles.actionBtn}>
            <Btn label='Cancel' bg={Colors.danger} type="none" onTap={handleBack} txtSize={20} customStyle={{ flex: 1, padding: 8 }} />
            <Btn label='Add' bg={Colors.success} isLoading={isLoading} spinnerColor={Colors.white300} type="filled" onTap={handleAdd} txtSize={20} customStyle={{ flex: 1, padding: 8 }} />
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default AddList;

const styles = StyleSheet.create({
  Root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: '#1616171c',
    paddingHorizontal: 18,
  },
  Card: {
    paddingVertical: 23,
    borderRadius: 23,
    ...CenterVertical,
    backgroundColor: '#ececef2c',
  },
  blurStyle: {
    // backgroundColor: '#0d0d0d4c ',
  },
  Wrapper: {
    flexDirection: 'row',
  },
  toggler: {
    flexDirection: 'row',
    // width: '90%',
    ...CenterHorizontal,
    gap: 10,
    alignItems: 'center',
  },
  StarTogglerText: {
    // marginLeft: 'auto',
    fontFamily: 'Poppins-Black',
    fontSize: 18,
    color: Colors.accent500
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#efefef',
  },
  actionBtn: {
    width: '90%',
    ...CenterHorizontal,
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 6,
    zIndex: 999,
  },
});