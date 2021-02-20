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

function checkBookAdded(user, bookName){
//    var isWorking = addBook(user, bookName);
//    console.log("what do we get", isWorking.json())
//    isWorking.json().then(data => {
//        console.log(data);
//    });
     var someValue = addBook(user, bookName);
        var test = addBook(user, bookName).catch(err=> { return reject(err); })
         test.then(result=>console.log(result));
      }


//    if (isWorking) {
//     navigation.navigate('PersonalAccount')}
//    else{ console.log("this didnt work");
//    }}

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
      <FormButton buttonTitle='Add' onPress={() => checkBookAdded(user, bookName)} />

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