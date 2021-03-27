import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PersonalAccount from '../screens/PersonalAccount';
import SettingScreen from '../screens/SettingScreen';
import BookClubAccount from '../screens/BookClubAccount';
import AddBook from '../screens/AddBook';
import AddClub from '../screens/AddClub';
import AddBookClub from '../screens/AddBookClub';
import MeetingScreen from '../screens/MeetingScreen';
import GroupInfo from '../screens/GroupInfo';
import requestScreen from '../screens/requestScreen';
import BookClubLandingScreen from '../screens/BookClubLandingScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='BookClub' component={HomeScreen} />
      <Stack.Screen name='PersonalAccount' component={PersonalAccount} />
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name='BookClubAccount' component={BookClubAccount} />
      <Stack.Screen name='AddBook' component={AddBook} />
       <Stack.Screen name='AddClub' component={AddClub} />
       <Stack.Screen name='MeetingScreen' component={MeetingScreen} />
       <Stack.Screen name='BookClubLandingScreen' component={BookClubLandingScreen} />
       <Stack.Screen name='AddBookClub' component={AddBookClub} />
       <Stack.Screen name='GroupInfo' component={GroupInfo} />
       <Stack.Screen name='requestScreen' component={requestScreen} />


    </Stack.Navigator>
  );
}