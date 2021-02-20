import React, { useContext, Component, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'


export default function BookClubAccount() {
  const { user, logout, JoinClub } = useContext(AuthContext);
  const navigation = useNavigation();
  const [clubName, setClub] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}> BookClub </Text>
      <FormButton buttonTitle='Create BookClub' onPress={() =>  navigation.navigate('AddClub')} />
      <Text style={styles.text}> Your Current BookClubs </Text>

      <Text style={styles.text}> Join a book Club </Text>
       <TouchableOpacity
         style={styles.navButton}
        onPress={() => JoinClub(user, clubName)}>
         <Text style={styles.navButtonText}>Join BookClub </Text>
       </TouchableOpacity>
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