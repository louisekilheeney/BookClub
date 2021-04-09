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
import bookDetails from '../screens/bookDetails';
import BookClubLandingScreen from '../screens/BookClubLandingScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='BookClub' component={HomeScreen}  options={{ title: 'BookClub' }}/>
      <Stack.Screen name='PersonalAccount' component={PersonalAccount}  />
      <Stack.Screen name='SettingScreen' component={SettingScreen}  />
      <Stack.Screen name='BookClubAccount' component={BookClubAccount}  />
      <Stack.Screen name='AddBook' component={AddBook} options={{ title: 'Add Book' }} />
       <Stack.Screen name='AddClub' component={AddClub} options={{ title: 'Add Club' }} />
       <Stack.Screen name='MeetingScreen' component={MeetingScreen} />
       <Stack.Screen name='BookClubLandingScreen' component={BookClubLandingScreen}  options={{ title: 'BookClub Account' }}/>
       <Stack.Screen name='AddBookClub' component={AddBookClub} />
       <Stack.Screen name='GroupInfo' component={GroupInfo} />
       <Stack.Screen name='requestScreen' component={requestScreen} options={{ title: 'Request Screen' }} />
       <Stack.Screen name='bookDetails' component={bookDetails} options={{ title: 'Book Details' }}/>
    </Stack.Navigator>
  );
}