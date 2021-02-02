import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookClubAccount from '../screens/BookClubAccount';
import AddBook from '../screens/AddBook';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='BookClubAccount' component={BookClubAccount} />
      <Stack.Screen name='AddBook' component={AddBook} />
    </Stack.Navigator>
  );
}