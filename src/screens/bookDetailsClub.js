import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, Link } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/starRating';
import { firebase } from '../config';

export default function bookDetailsClub({route}) {
  const { user, logout, setCurrentBookClub } = useContext(AuthContext);
  const navigation = useNavigation();
  const { _item, _club } = route.params;
  const [isEnabled, setIsEnabled] = useState(_item.currentBook);
  console.log("item in book detials club", _item, _club);
      console.log("item id in booooooooooooooooookkkkkkkkkkkkkkkkkkkkk detail", _item.id);
  console.log(user);

  function onToggleSwitch(toggled){
        setIsEnabled(toggled);
        _item.currentBook = toggled;
        setCurrentBookClub(_item.author, _item.bookName, _item.bookSynopsis, _item.bookGenre, _item.id,
         _item.bookImage, _item.bookPub, toggled, _club);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book Name: {_item.bookName} </Text>
      <Text style={styles.text}>Book Author: {_item.author} </Text>
      <Text style={styles.text}>Book Genre: {_item.bookGenre}</Text>
      <Text style={styles.text}>Book Publisher: {_item.bookPub}</Text>
      <Text style={styles.text}>Book synopsis: {_item.bookSynopsis} </Text>
      <Text style={styles.text}>Current Book? </Text>
      <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={_item.isCurrentBook ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(isEnabled) => onToggleSwitch(isEnabled)}
          value={isEnabled}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
  },
    synopsis: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
    },
  text: {
    fontSize: 20,
    color: '#274c77',
    paddingBottom: 20
  },
   reviewContainer: {
      backgroundColor: "#ebebeb",
      borderRadius: 10,
      paddingHorizontal: 30,
      paddingVertical: 40,
      minWidth: "80%",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1.0,
      shadowRadius: 2,
      shadowColor: "rgba(193, 211, 251, 0.5)",
      elevation: 5,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#323357",
      textAlign: "center",
    },
});