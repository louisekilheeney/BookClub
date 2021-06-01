//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function requestScreen({route}) {
  const { user, logout, JoinClub } = useContext(AuthContext);
   const { request } = useContext(AuthContext);
  const navigation = useNavigation();
  const {clubItem,  _club } = route.params;
  console.log("detials club", clubItem, _club);
  console.log("item in request page", clubItem);
  console.log("item in request page", clubItem.clubName);
  console.log("in request page");
  console.log(user);
  var clubName =  clubItem.clubName;
  return (
    <View style={styles.container}>

      <Text style={styles.text}>ClubName: {clubItem.clubName}</Text>

      <Text style={styles.text}>Request to join club</Text>

      <FormButton buttonTitle='Join Club' onPress={() =>  JoinClub(user, clubItem, _club, clubName)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
   backgroundColor: '#ebebeb',
   borderRadius: 10,
   borderWidth: 0.5,
   borderColor: '#000',
   padding: 10,
   margin: 20,
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#333333',
    paddingBottom: 20
  }
});