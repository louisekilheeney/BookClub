//code is derived/used and modified from: https://reactnavigation.org/docs/bottom-tab-navigator/
// Author: React Navigation
// last accessed on: 01/06/2021

import React, { useContext, Component, useState } from 'react';
import { View, Text, StyleSheet, boolean } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PersonalAccount from '../screens/PersonalAccount';
import SettingScreen from '../screens/SettingScreen';
import BookClubAccount from '../screens/BookClubAccount';
import messageScreen from '../screens/messageScreen';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import IconsFeather from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';

  const Tab = createBottomTabNavigator();
  const startReload = ()=> RNRestart.Restart();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeLandingScreen} options={{tabBarLabel: "Home", tabBarIcon: ({ color, size }) => (<IconsFeather name="home" color={color} size={26} />), }} onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}  />
            <Tab.Screen name="My Account"  component={PersonalAccount} options={{tabBarLabel: "My Account", tabBarIcon: ({ color, size }) => (<IconsFeather name="user" color={color} size={26} />),}} onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}  />
            <Tab.Screen name="BookClub" component={BookClubAccount} options={ {tabBarLabel: "Book Clubs", tabBarIcon: ({ color, size }) => (<IconsFeather name="book" color={color} size={26} />), }} onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})} />
            <Tab.Screen name="Messages" component={messageScreen} options={{tabBarLabel: "Messages", tabBarIcon: ({ color, size }) => (<IconsFeather name="message-square" color={color} size={26} />), }} onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}  />
            <Tab.Screen name="Settings" component={SettingScreen} options={{tabBarLabel: "Settings", tabBarIcon: ({ color, size }) => (<IconsFeather name="settings" color={color} size={26} />), }} onPress={{unmountOnBlur: false}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}  />
        </Tab.Navigator>
    );
}

export default function HomeScreen() {

  return (
        <MyTabs />
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
