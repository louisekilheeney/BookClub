//code is derived/used and modified from: https://reactnavigation.org/docs/bottom-tab-navigator/
// Author: React Navigation
// last accessed on: 01/06/2021

import React, { useContext, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native';
import PersonalAccount from '../screens/PersonalAccount';
import AddBook from '../screens/AddBook';
import ClubBookList from '../screens/ClubBookList';
import SettingScreen from '../screens/SettingScreen';
import BookClubAccount from '../screens/BookClubAccount';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import GeneralScreen from '../screens/GeneralScreen';
import MeetingScreen from '../screens/MeetingScreen';
import GroupInfo from '../screens/GroupInfo';
import IconsFeather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function BookClubLandingScreen({route}) {
  const { _item } = route.params;
  console.log("item", _item);
  const navigation = useNavigation();


  return (
        <TopTab.Navigator>
            <TopTab.Screen name="General" component={GeneralScreen} options={ {tabBarLabel: "General" }} initialParams={{item: _item} }  onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})} />
            <TopTab.Screen name="books" component={ClubBookList} options={{tabBarLabel: "books" }} initialParams={{item: _item} }   onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
            <TopTab.Screen name="Meeting" component={MeetingScreen} options={{tabBarLabel: "Meeting"}}  onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
            <TopTab.Screen name="GroupInfo" component={GroupInfo}  options={{tabBarLabel: "Group info"}}  initialParams={{item: _item} }  onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
         </TopTab.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
