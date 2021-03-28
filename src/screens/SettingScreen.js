import React, { useContext } from 'react';
import { Button, View, Text, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import FormButton from '../components/FormButton';
import RemoveButton from '../components/RemoveButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { windowHeight, windowWidth } from '../utils/Dimension';




export default function SettingScreen() {
  const { user, logout, RemoveUser } = useContext(AuthContext);

function confirmDelete(user){
Alert.alert(
      "You are about to delete your account!",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
         { text: "OK", onPress: () => RemoveUser(user) }

      ],
      { cancelable: false }
    );
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
      <RemoveButton buttonTitle='Remove Account' onPress={() => confirmDelete(user)}  />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f1',
        paddingTop: 10
  },
  text: {
    fontSize: 30,
    color: '#333333',
    paddingBottom: 50
  },
  buttonContainer: {
     marginTop: 10,
     width: windowWidth / 2,
     height: windowHeight / 15,
     backgroundColor: '#FF0000',
     padding: 10,
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 8
    },
  buttonText: {
     fontSize: 20,
     color: '#ffffff'
    }
});