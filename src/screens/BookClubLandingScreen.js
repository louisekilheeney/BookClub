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

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeLandingScreen} options={{tabBarLabel: "Home", tabBarIcon: ({ color, size }) => (<IconsFeather name="home" color={color} size={26} />), }} />
            <Tab.Screen name="My Account" component={PersonalAccount}  options={{tabBarLabel: "My Account", tabBarIcon: ({ color, size }) => (<IconsFeather name="user" color={color} size={26} />), }} />
            <Tab.Screen name="BookClub" component={BookClubAccount} options={{tabBarLabel: "Book Clubs", tabBarIcon: ({ color, size }) => (<IconsFeather name="book" color={color} size={26} />), }} />
            <Tab.Screen name="Messages" component={SettingScreen} options={{tabBarLabel: "Messages", tabBarIcon: ({ color, size }) => (<IconsFeather name="message-square" color={color} size={26} />), }} />
            <Tab.Screen name="Settings" component={SettingScreen} options={{tabBarLabel: "Settings", tabBarIcon: ({ color, size }) => (<IconsFeather name="settings" color={color} size={26} />), }} />
        </Tab.Navigator>
    );
}
//function MyTopTabs(items) {
//    return (
//
//
//    );
//}

export default function BookClubLandingScreen({route}) {
  const { _item } = route.params;
  console.log("item", _item);
  const navigation = useNavigation();

  //MyTopTabs(_item)

  return (
        <TopTab.Navigator>
                    <TopTab.Screen name="General" component={GeneralScreen} options={ {tabBarLabel: "General" }} />
                    <TopTab.Screen name="books" component={ClubBookList} options={{tabBarLabel: "books" }} initialParams={{item: _item} } />
                    <TopTab.Screen name="Meeting" component={MeetingScreen} options={{tabBarLabel: "Meeting"}}/>
                    <TopTab.Screen name="GroupInfo" component={GroupInfo}  options={{tabBarLabel: "Group info"}} />
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
