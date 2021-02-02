import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome user {user.uid}</Text>


       <FormButton buttonTitle='Personal' onPress={() =>  navigation.navigate('PersonalAccount')} />
       <FormButton buttonTitle='Bookclub' onPress={() => navigation.navigate("BookClubAccount")} />
       <FormButton buttonTitle='Settings' onPress={() => navigation.navigate("SettingScreen")} />
       <FormButton buttonTitle='Logout' onPress={() => logout()} />

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