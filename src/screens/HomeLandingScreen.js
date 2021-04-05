import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../logo/bookClubLogo.png')} />

      <Text style={styles.text}>Welcome {user.email}</Text>

      <Text style={styles.text}>Your Current books</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#e7ecef'
  },
  text: {
    fontSize: 20,
    color: '#333333',
    paddingBottom: 20
  },
  image: {
    width: 200, height: 200
  }
});