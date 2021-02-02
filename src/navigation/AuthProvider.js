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
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            setError("login error");
            alert("user name/password is incorrect")
            console.log(e);
          }
        },
        register: async (name, email, password) => {
          try {
            const usersTable = firebase.firestore().collection("users").add({
                name: name,
                email: email
            });

            await auth().createUserWithEmailAndPassword( email, password);
            console.log("We are trying to reg a user." + email);
            //console.log("current user:", firebase.auth());

//            usersTable.get()
//                        .then((snapshot) => {
//                          const data = snapshot.docs.map((doc) => ({
//                          ...doc.data(),
//
//                          }));
//                          console.log("All data in 'users' collection", data);
//                        });

//            const promise = usersTable
//              .add({
//                name: name,
//                email: email
//              })
              //console.log("Added the data and got a promise back", promise.id)
              usersTable.then((ref) => {
                console.log("Added doc with ID: ", ref.id);
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
//             const userInfo = firebase.firestore().collection("users").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 console.log("doc id: "`${doc.id} => ${doc.data()}`);
//             })});
            const userInfo = firebase.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc).then(response => response.json()).then(data => {
                  console.log("data got", data);
              }))});

            console.log("user_info: ", userInfo);
             //console.log("user_id: ", user.uid);
            //console.log("user-email: ", user.email);
            //var userid = "UoUBKeTEts9HWWbkQVMR";
            const userbooks = firebase.firestore().collection("users").doc().collection('booksList').add({
              bookName: bookName
            });
           console.log('Added book with name: ', bookName, "to user", user.email);


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