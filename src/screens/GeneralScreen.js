import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import moment from 'moment';

export default function GeneralScreen({route}) {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  const {item } = route.params;
  console.log("item in general page", item);
  const TIME_NOW_IN_UTC = moment.utc();
  const utcDateToString = momentInUTC => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Welcome to {item.clubName} Book club</Text>
      <Text style={styles.text}> Current book: bookname</Text>
      <Text style={styles.text}> Next Meeting is: </Text>
        <Text style={styles.time}>
         {moment
           .utc(TIME_NOW_IN_UTC)
           .local()
           .format('lll')}
       </Text>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7ecef',
    paddingTop: 10
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
    },
   time: {
     fontSize: 20,
    color: '#333333',
    flex: 0.5,
    backgroundColor: '#ebebeb',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 10,

    justifyContent: 'center',
    alignItems: 'center'

        }
});