import { Text, SafeAreaView, StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import ScreenTitle from '../components/ScreenTitle';
import { useFocusEffect } from "@react-navigation/native";
import { post } from "../utils/magicBox";
import { AuthContext } from "../store/authContext";
import AddBtn from "../components/AddBtn";
import { useNavigation } from "@react-navigation/native";
import AddList from "../components/XpnseList/AddList";
import SpaceMaker from "../components/SpaceMaker";
import Spinner from "../components/Spinner";
import Colors from "../utils/colors";
import SVGIcons from "../utils/SVGIcons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarFaded from '../assets/images/starFaded.svg';
import StarColored from '../assets/images/starColred.svg';
import Settings from '../assets/images/Settings.svg';
import Line from "../components/Line";
import { BlurView } from "@react-native-community/blur";

// >> MAIN FUNCTION
function ExpenseList() {
  const naviagtion = useNavigation();

  /// USE CONTEXT
  const authCtx = useContext(AuthContext);


  /// USE STATE
  const [xpnseList, setXpnseList] = useState([]);
  const [renderAddList, setRenderAddList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  /// Initial Render
  async function fetchXpnseList() {
    const id = authCtx.token;
    const response = await post({}, `expense-list/${id}`, {});
    if (response.status === 'success') {
      setIsLoading(false);
      setXpnseList(response.data);
    }
  }
  useFocusEffect(useCallback(() => {
    fetchXpnseList();
    setRenderAddList(false);
  }, []));
  /// FUNCTIONS
  function handleAddXpnseList() {
    // naviagtion.navigate('AddList');
    setRenderAddList(prev => !prev);
  }
  async function toggleStar(item) {
    await post({ star: !item.isStarred }, `expense-list/set-starred/${item._id}`, {});

    let updatedXpnseList = xpnseList.map(list => {
      if (list._id === item._id) {
        list.isStarred = !list.isStarred;
      }
      return list;
    });

    updatedXpnseList.sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      return 0;

    });
    setXpnseList(updatedXpnseList);
  }


  function handleMenuPress(id) {
    setSelectedItemId((prevId) => (prevId === id ? null : id));

  }


  function handleXpnseNavigation(id, name) {
    naviagtion.navigate('Xpnse', { id, name });
  }

  function handleListAdd(state) {
    if (state)
      fetchXpnseList();

  }

  /// COMPONENT 
  const RenderItem = ({ item }) => {
    return (
      <View key={ item._id } style={ styles.XpnseItem }>
        <Pressable onPress={ () => handleXpnseNavigation(item._id, item.name) } style={ styles.NameNTransaction }>
          <Text style={ styles.ItemName }>{ item.name }</Text>
          <Text style={ styles.Transactions }>{ item.transactions } Transactions</Text>
        </Pressable>
        <View style={ styles.Amount }>
          <Text style={ styles.AmountText }>₹{ item.amount }</Text>
        </View>
        <Pressable style={ styles.Star } onPress={ () => { toggleStar(item); } }>
          {
            item.isStarred
              ? <SVGIcons SvgSrc={ StarColored } />
              : <SVGIcons SvgSrc={ StarFaded } />
          }
        </Pressable>
        <Pressable style={ styles.Settings } onPress={ () => handleMenuPress(item._id) }>
          <SVGIcons SvgSrc={ Settings } fill="#ececef8c" />
        </Pressable>
        { selectedItemId === item._id && (
          <View style={ styles.MenuList }>
            <Pressable><Text style={ styles.MenuText }>Edit</Text></Pressable>
            <Pressable><Text style={ styles.MenuText }>More</Text></Pressable>
            <Line customStyle={ { height: 1, width: '90%', backgroundColor: '#1616173c' } } />
            <Pressable><Text style={ [styles.MenuText, { color: Colors.danger }] }>Delete</Text></Pressable>
          </View>
        ) }
      </View>
    );
  };
  // >> RETURN
  return (
    <SafeAreaView style={ styles.root }>
      { renderAddList ? <AddList navigation={ naviagtion } renderComponent={ setRenderAddList } handleListAdd={ handleListAdd } /> : '' }
      <ScreenTitle size={ 22 }>Expense List</ScreenTitle>
      { isLoading ? <Spinner color={ Colors.accent500 } msg="Fetching Expense List..." size={ 38 } /> : '' }
      <View style={ styles.body }>
        <FlatList data={ xpnseList } renderItem={ RenderItem } keyExtractor={ (item) => item._id }
          ListFooterComponent={ () => <SpaceMaker custom={ { height: 120 } } /> }
          alwaysBounceVertical={ true }
          showsVerticalScrollIndicator={ false }
        />
      </View>
      <AddBtn onPress={ handleAddXpnseList } />
    </SafeAreaView>
  );
}
export default ExpenseList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 2,
  },
  body: {
    paddingHorizontal: 18,
    zIndex: 2,
  },
  XpnseItem: {
    flexDirection: 'row',
    padding: 8,
    flex: 1,
    alignItems: 'center',
  },
  NameNTransaction: {
    flex: 1,
  },
  ItemName: {
    fontFamily: 'Inika-Bold',
    fontSize: 17,
    textTransform: 'capitalize',
    color: Colors.white500,
  },
  Transactions: {
    fontSize: 14,
    color: '#efefefac',
  },
  Amount: {
    marginHorizontal: 12,
  },
  AmountText: {
    fontSize: 20,
  },
  Star: {
    marginHorizontal: 10,
  },
  Settings: {
    marginHorizontal: 8,
  },
  MenuList: {
    position: 'absolute',
    right: 27,
    top: '130%',
    backgroundColor: '#EEf1f88C',
    padding: 8,
    width: 160,
    borderRadius: 16,
  },
  MenuText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary500,
    paddingVertical: 5,
  },
});