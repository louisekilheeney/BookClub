import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error} = useContext(AuthContext);

  return (

    <View style={styles.container}>
      <Text style={styles.text}>Welcome to BookClub</Text>
      <FormInput
        value={email}
        placeholderText='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <FormInput
        value={password, error}
        placeholderText='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
       <FormButton buttonTitle='Login' onPress={() => login(email, password, navigation)} />
       <TouchableOpacity
           style={styles.navButton}
           onPress={() => navigation.navigate('ForgetPassword')}
        >
           <Text style={styles.navButtonText}>Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.navButtonText}>Create an account? </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
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
    fontSize: 20,
    marginBottom: 20,
    color: '#003366'
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#457b9d'
  }
});