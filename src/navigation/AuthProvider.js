import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            });
          } catch (e) {
            setError("login error");
            alert("user name/password is incorrect")
            console.log(e);
          }
        },
        register: async (name, email, password) => {
          try {

            auth().createUserWithEmailAndPassword( email, password)
                .then((userCredential) => {
                firebase.database().ref('Users/'+userCredential.user.uid).set({
                                  email,
                                  displayName: name
                           }).then((data)=>{
                                  //success callback
                                  console.log('User data was added sucessfully' , data)
                           }).catch((error)=>{
                                  //error callback
                                  console.log('error with adding user data' , error)
                           });
                           console.log("credential user: ", userCredential.user);
                           console.log("We are trying to reg a user." + email);
                });
          } catch (error) {
            console.log('Storing Error', error);
          }

       },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        addBook: async (user, bookName) => {
         try {
         console.log("user details:", user);
            firebase.database().ref('Users/'+user.uid+'/BookList').push({
              bookName,
             }).then((data)=>{
              //success callback
              console.log('Adding book to users personal collection' , data)
             }).catch((error)=>{
              //error callback
              console.log('error with adding book to personal list ' , error)
            });
          }catch (e) {
           console.error(e);
         }
        }
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};