//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';

export default function AddClub() {
  const { user, logout, addClub } = useContext(AuthContext);
  const navigation = useNavigation();
  const [clubName, setClub] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add a new BookClub </Text>

      <FormInput
             value={clubName}
             placeholderText='clubName'
             onChangeText={userClub => setClub(userClub)}
             autoCapitalize='none'
             keyboardType='clubName'
             autoCorrect={false}
      />
      <FormButton buttonTitle='Add' onPress={() => addClub(user, clubName)} />

    </View>
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