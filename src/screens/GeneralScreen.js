import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function GeneralScreen({route}) {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  const {item } = route.params;
  console.log("item in general page", item);
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Welcome to {item.clubName} Book club</Text>
      <Text style={styles.text}> Current book: bookname</Text>
      <Text style={styles.text}> Next Meeting is: </Text>


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
     flex: 0.5
  },
    header: {
      fontSize: 20,
      color: '#333333',
     padding: 20,
      flex: 0.5
    }
});