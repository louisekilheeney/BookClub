import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';

export default function BookClubAccount() {
  const { user, logout, addBook } = useContext(AuthContext);
  const navigation = useNavigation();
  const [bookName, setBook] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add book </Text>

      <FormInput
             value={bookName}
             placeholderText='bookName'
             onChangeText={userBook => setBook(userBook)}
             autoCapitalize='none'
             keyboardType='bookName'
             autoCorrect={false}
      />
      <FormButton buttonTitle='Add' onPress={() => addBook(user, bookName)} />

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