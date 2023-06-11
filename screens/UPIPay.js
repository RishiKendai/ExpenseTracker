import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import React, { useContext, useReducer, useState, useEffect, useCallback } from 'react';

import BackIcon from '../assets/images/leftArrow.svg';
import { Dropdown } from 'react-native-element-dropdown';

import ScreenTitle from "../components/ScreenTitle";
import Input from "../components/Input";
import { AuthContext } from "../store/authContext";
import Spinner from '../components/Spinner';
import SpaceMaker from "../components/SpaceMaker";
import { post } from "../utils/magicBox";
import { CenterHorizontal, CenterVertical } from "../utils/GlobalStyles";
import Colors from "../utils/colors";
import Btn from "../components/Btn";
import { useFocusEffect } from "@react-navigation/native";




const addXpenseState = {
  uid: '',
  paidTo: '',
  amount: '',
  note: '',
  label: {},
  expenseType: true,
  proof: null,
};


function addXpenseReducer(state, action) {
  switch (action.type) {
    case 'uid':
      return { ...state, uid: action.payload };
    case 'paidTo':
      return { ...state, paidTo: action.payload };
    case 'amount':
      return { ...state, amount: action.payload };
    case 'note':
      return { ...state, note: action.payload };
    case 'label':
      return { ...state, label: action.payload };
    default:
      return addXpenseState;
  }
}



const UPIPay = ({ navigation, route }) => {
  const { type, data } = route.params;

  const authCtx = useContext(AuthContext);

  const [addXpenseData, addXpenseDispatch] = useReducer(addXpenseReducer, addXpenseState);
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [upiData, setUPIData] = useState({});

  useEffect(() => {
    addXpenseDispatch({ type: 'uid', payload: authCtx.token });
    const rawData = data.split('?')[1];
    const abstractedData = rawData.split('&');
    const upiObject = {};
    for (const item of abstractedData) {
      let [key, value] = item.split("=");
      if (key === 'pn') value = decodeURI(value);
      upiObject[key] = value;
    }
    setUPIData(upiObject);
    addXpenseDispatch({ type: 'paidTo', payload: upiObject.pn });
  }, []);

  useEffect(() => {

    const getLabels = async () => {
      const response = await post({}, 'label/get-all', {
        headers: {
          'Authorization': `Bearer ${authCtx.token}`
        }
      });
      setLabels(response.labels);
      setIsScreenLoading(false);
    };
    getLabels();
  }, []);

  // Dropdown
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // --Dropdown



  function handleBack() {
    navigation.goBack();
  }

  async function handleAdd() {
    if (type === 'daily') {
      await post(addXpenseData, 'daily-expense/create', {});
      Linking.openURL(data)
      return navigation.navigate('DailyExpense', { refresh: true });
    }
    
    if (type === 'target') {
      await post(addXpenseData, 'expense/create', { 'Content-Type': 'multipart/form-data' });
      Linking.openURL(data)
      return navigation.navigate('Xpnse', { id: id, name: name, refresh: true });
    }

  }

  return (
    <View style={ styles.Root }>
      {
        isScreenLoading
          ? <Spinner size={ 43 } color={ Colors.dogerBlue500 } msg='Loading Data' />
          :
          <View style={ styles.Root }>
            <ScreenTitle backAction={ handleBack } size={ 22 } renderBackIcon={ true } center={ true } backIcon={ <BackIcon /> }>UPI Pay</ScreenTitle>
            <ScrollView>
              <SpaceMaker custom={ { height: 24 } } />
              <Input label="paid to" inputType="" keyType="default" action="paidTo" onInput={ addXpenseDispatch } data={ addXpenseData.paidTo } />
              <SpaceMaker custom={ { height: 32 } } />
              <Input label="amount" inputType="" keyType="number-pad" action="amount" onInput={ addXpenseDispatch } data={ addXpenseData.amount.toString() } />
              <SpaceMaker custom={ { height: 32 } } />
              <Input multiline={ true } lines={ 100 } label="note" keyType="default" action="note" onInput={ addXpenseDispatch } data={ addXpenseData.note } />
              <SpaceMaker custom={ { height: 32 } } />
              <Dropdown
                style={ [styles.dropdown, isFocus && { borderColor: Colors.accent500 }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ labels }
                maxHeight={ 300 }
                labelField="name"
                activeColor={ Colors.accent800 }
                containerStyle={ { backgroundColor: Colors.primary600, borderRadius: 6, overflow: 'hidden', marginTop: 7, borderWidth: 0 } }
                itemContainerStyle={ { borderBottomWidth: 1, borderBottomColor: Colors.accent800 } }
                valueField="color"
                placeholder={ !isFocus ? 'Select Label' : '...' }
                value={ value }
                onFocus={ () => setIsFocus(true) }
                onBlur={ () => setIsFocus(false) }
                onChange={ item => {
                  setValue(item.value);
                  addXpenseDispatch({ type: 'label', payload: { _id: item._id, name: item.name, color: item.color, access: item.access } });
                  setIsFocus(false);
                } } />
            </ScrollView>
            <View style={ styles.actionBtn }>
              <Btn label='Cancel' bg={ Colors.danger } type="none" onTap={ handleBack } txtSize={ 20 } customStyle={ { flex: 1, padding: 8 } } />
              <Btn label='Pay' bg={ Colors.dogerBlue500 } isLoading={ isLoading } spinnerColor={ Colors.white300 } type="filled" onTap={ handleAdd } txtSize={ 20 } customStyle={ { flex: 1, padding: 8 } } />
            </View>
          </View>
      }
    </View>

  );
};

export default UPIPay;

const styles = StyleSheet.create({
  Root: {
    flex: 1,
  },
  dropdown: {
    height: 50,
    width: '90%',
    ...CenterHorizontal,
    borderColor: '#767676',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#efefef',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  imagePickerBtn: {
    width: '90%',
    ...CenterHorizontal,
    flexDirection: 'row',
  },
  previewImage: {
    width: 200,
    height: 200,
    ...CenterHorizontal,
    borderRadius: 16,
  },
  actionBtn: {
    width: '90%',
    ...CenterHorizontal,
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 6,
  },
});