import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';


export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = useContext(AuthContext);

function validate(name, email, password, confirmPassword){
        if(!name){
            alert("please enter your name");
            return;
        }
        if(!email){
            alert("please enter your email address");
            return;
        }
        if(!password){
            alert("please enter your password");
            return;
        }
        if(!confirmPassword){
            alert("please confirm your password");
            return;
        }

        if (password != confirmPassword && !password) {
          alert("passwords don't match, try again");
          return;
        }
        else{
            register(name, email, password );
            console.log("passwords match")
        }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
       <FormInput
          value={name}
          placeholderText='Name'
          onChangeText={userName => setName(userName)}
          autoCapitalize='none'
          keyboardType='name'
          autoCorrect={false}
       />
      <FormInput
        value={email}
        placeholderText='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
       <FormInput
          value={confirmPassword}
          placeholderText='Confirm Password'
          onChangeText={userConfirmPassword => setConfirmPassword(userConfirmPassword)}
          secureTextEntry={true}
        />
      <FormButton buttonTitle='Signup' onPress={() => validate(name, email, password, confirmPassword)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f4ff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 20,
        margin: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: '#4357ad'
  }
});