import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, Link } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/starRating';

export default function bookDetails({route}) {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { _item } = route.params;
  console.log("item", _item);
  console.log(user);
    if(isEnabled == true){
    console.log("this is a current book")

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
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
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