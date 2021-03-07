import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.email}</Text>

      <Text style={styles.text}>Your Current books</Text>





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