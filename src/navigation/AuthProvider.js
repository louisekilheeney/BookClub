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
        login: async (email, password, navigation) => {
          try {
            auth().signInWithEmailAndPassword(email, password);
            auth().onAuthStateChanged(function(user) {
            if (user) {
              console.log("User finally signed in");
              console.log("user", user);

            } else {
              console.log("Dumbass user is still not logged in");
              console.log("user", user);

              // No user is signed in.
            }
          });
//            .then((userCredential) => {
//                setUser(userCredential.user);


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
        readUserData: async (user) => {
          try {
          console.log("working on displaying booklist");

         } catch (e) {
            console.error(e);
          }
        },
        RemoveUser: async (user) => {
          try {

            console.log("user details", user.uid);
            console.log("Crrent auth user: ", auth().currentUser)

            const removeThisId = user.uid;
            auth().currentUser.delete().then(function() {
              // User deleted.
              console.log("user deleted");
            }, function(error) {
              // An error happened.
              console.log("users still in the table", error);
            });
            firebase.database().ref('Users/'+removeThisId).remove();
            console.log("User removed from DB");
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
              alert("Added Book" + " " + bookName);
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