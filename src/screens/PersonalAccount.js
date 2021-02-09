import React, { useContext, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import List from '../components/readData';

export default function PersonalAccount() {
  const { user, readUserData } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Personal Account</Text>
      <FormButton buttonTitle='AddBook' onPress={() =>  navigation.navigate('AddBook')} />

       <Text style={styles.text}>Current BookList </Text>
       <Text style={styles.text}><List /></Text>

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
  },

});