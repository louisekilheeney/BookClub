import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
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
    const [author, setAuthor] = useState('');
    const [bookSynopsis, setSynopsis] = useState('');
    const [bookPub, setPub] = useState('');
    const [bookGenre, setGenre] = useState('');
    const [bookImage, setImage] = useState('');


    function checkBookAdded(user, bookName, author, bookSynopsis, bookPub,bookGenre, bookImage){
        var test = addBook(user, bookName, author, bookSynopsis,bookPub,bookGenre,bookImage).catch(err=> { return reject(err); })
        test.then(result=>console.log("the result of adding a book", result));
    }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add book </Text>

      <FormInput
         value={bookName}
         placeholderText='Name'
         onChangeText={userBook => setBook(userBook)}
         autoCapitalize='none'
         //keyboardType='bookName'
         autoCorrect={false}
      />
       <FormInput
           value={author}
           placeholderText='Author'
           onChangeText={userAuthor => setAuthor(userAuthor)}
           autoCapitalize='none'
           //keyboardType='author'
           autoCorrect={false}
        />
        <FormInput
            value={bookSynopsis}
            placeholderText='Synopsis'
            onChangeText={userSynopsis => setSynopsis(userSynopsis)}
            autoCapitalize='none'
            //keyboardType='bookSynopsis'
            autoCorrect={false}
        />
         <FormInput
            value={bookPub}
            placeholderText='Publisher'
            onChangeText={userPub => setPub(userPub)}
            autoCapitalize='none'
           // keyboardType='bookPub'
            autoCorrect={false}
        />
        <FormInput
            value={bookGenre}
            placeholderText='Genre'
            onChangeText={userGenre => setGenre(userGenre)}
            autoCapitalize='none'
            //keyboardType='bookGenre'
            autoCorrect={false}
        />
        <FormInput
            value={bookImage}
            placeholderText='BookArt'
            onChangeText={userImage => setImage(userImage)}
            autoCapitalize='none'
            //keyboardType='bookGenre'
            autoCorrect={false}
          />
      <FormButton buttonTitle='Add' onPress={() => checkBookAdded(user, bookName, author, bookSynopsis,bookPub,bookGenre,bookImage)} />
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
    fontSize: 30,
    color: '#333333'
  }
});