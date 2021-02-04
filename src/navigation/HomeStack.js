import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PersonalAccount from '../screens/PersonalAccount';
import SettingScreen from '../screens/SettingScreen';
import BookClubAccount from '../screens/BookClubAccount';
import AddBook from '../screens/AddBook';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='bookClub' component={HomeScreen} />
      <Stack.Screen name='PersonalAccount' component={PersonalAccount} />
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name='BookClubAccount' component={BookClubAccount} />
      <Stack.Screen name='AddBook' component={AddBook} />
    </Stack.Navigator>
  );
}