import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function GroupInfo({route}) {
  const { user, logout, getClubMembers } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  const {item } = route.params;
  console.log("item in general page", item);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group Info Screen</Text>
      <Text style={styles.header}> Club Name:  {item.clubName} </Text>
      <Text style={styles.header}> Club ID:  {item.id} </Text>
      <FormButton buttonTitle='Members' onPress={() => getClubMembers(user, clubName)} />



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
  },
    header: {
    fontSize: 15,
    color: '#333333'
  }
});