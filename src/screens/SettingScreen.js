import React, { useContext, useState } from 'react';
import { Button, View, Text, StyleSheet,TouchableOpacity, Alert, Switch } from 'react-native';
import FormButton from '../components/FormButton';
import RemoveButton from '../components/RemoveButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { windowHeight, windowWidth } from '../utils/Dimension';




export default function SettingScreen() {
  const { user, logout, RemoveUser } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

      <FormButton buttonTitle='Logout' onPress={() => logout()} />
      <Text style={styles.textline}>Remove Account?</Text>
      <RemoveButton buttonTitle='Remove Account' onPress={() => confirmDelete(user)}  />
      <Text style={styles.textline}>Light/Dark Mode</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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