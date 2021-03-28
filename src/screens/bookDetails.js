import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/starRating';

export default function bookDetails() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
     const ratingObj = {
        ratings: 3,
        views: 34000
      }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book Name: </Text>
      <Text style={styles.text}>Book Author: </Text>
      <Text style={styles.text}>Book Genre: </Text>
      <Text style={styles.text}>Book Publisher: </Text>
      <Text style={styles.text}>Book synopsis: </Text>

//      <View style={styles.reviewContainer}>
//              <Text style={styles.title} onPress={() => navigation.navigate('StarRating')}>Leave a review</Text>
//      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    color: '#333333',
    paddingBottom: 20
  },
   reviewContainer: {
      backgroundColor: "#FFFFFF",
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