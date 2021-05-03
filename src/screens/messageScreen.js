import React, { useContext, useState } from 'react';
import { Button, View, Text, StyleSheet,TouchableOpacity, Alert, Switch } from 'react-native';
import FormButton from '../components/FormButton';
import RemoveButton from '../components/RemoveButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { windowHeight, windowWidth } from '../utils/Dimension';




export default function SettingScreen() {
  const { user, logout, RemoveUser } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text style={styles.textline}>Coming Soon</Text>

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
    fontSize: 30,
    color: '#274c77',
    paddingBottom: 50
  },
    textline: {
      fontSize: 20,
      color: '#274c77',
      paddingTop: 10
    }
});