import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'


export default function requestScreen({route}) {
  const { user, logout } = useContext(AuthContext);
   const { request } = useContext(AuthContext);
  const navigation = useNavigation();
  const {clubItem } = route.params;

  console.log("item in request page", clubItem);

  console.log(user);
  return (
    <View style={styles.container}>

      <Text style={styles.text}>ClubName: {clubItem.clubName}</Text>

      <Text style={styles.text}>Request to join CLub</Text>
      <FormButton buttonTitle='Join Club' onPress={() => request(user,clubItem.clubName, clubItem.id, navigation.navigate('BookClubAccount'))} />

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