import React, { useContext, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PersonalAccount from '../screens/PersonalAccount';
import SettingScreen from '../screens/SettingScreen';
import BookClubAccount from '../screens/BookClubAccount';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeLandingScreen} options={{tabBarLabel: "Home", tabBarIcon: ({ color, size }) => (<Icons name="home" color={color} size={26} />), }} />
            <Tab.Screen name="My Account" component={PersonalAccount}  options={{tabBarLabel: "My Account", tabBarIcon: ({ color, size }) => (<Icons name="account-circle" color={color} size={26} />), }} />
            <Tab.Screen name="BookClub" component={BookClubAccount} options={{tabBarLabel: "BookClub", tabBarIcon: ({ color, size }) => (<Icons name="book" color={color} size={26} />), }} />
            <Tab.Screen name="Settings" component={SettingScreen} options={{tabBarLabel: "Settings", tabBarIcon: ({ color, size }) => (<Icons name="account-settings" color={color} size={26} />), }} />
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
