//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  var clubId;

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

            }
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
        readUserData: async (user) => {
          try {
          console.log("working on displaying booklist");
          firebase.database().ref('Users/'+user.uid+'/BookList').on('value', function (snapshot) {
              console.log(snapshot.val())

          });
         } catch (e) {
            console.error(e);
          }
        },
        getClubMembers: async (user) => {
          try {
          firebase.database().ref('Users/'+user.uid+'/BookList').on('value', function (snapshot) {
              console.log(snapshot.val())

          });
         } catch (e) {
            console.error(e);
          }
        },
        setCurrentBook: async (author, bookName, bookSynopsis, bookGenre, id,
                                        bookImage,bookPub, currentBook) => {
          try {
           firebase.database().ref('Users/'+user.uid+'/BookList/'+ id).update ({
                author,
                bookName,
                bookSynopsis,
                bookGenre,
                bookImage,
                bookPub,
                currentBook
            });
         } catch (e) {
            console.error(e);
          }
        },
        setCurrentBookClub: async (author, bookName, bookSynopsis, bookGenre, id,
                                    bookImage,bookPub, currentBook, clubId) => {
          //var bookclubid = '-MUF-XTkLJcu9DGPiizl'
         console.log("checking value of id", id);
        try {
            firebase.database().ref('BookClub/'+clubId+'/BookList/'+ id).update ({
                author,
                bookName,
                bookSynopsis,
                bookGenre,
                bookImage,
                bookPub,
                currentBook
            });
         } catch (e) {
            console.error(e);
          }
        },

        RemoveClub: async (user,clubName, clubId) => {
          try {
          console.log("removing club", clubName);
          var member = user.uid;

           firebase.database().ref('BookClub/'+clubId).remove();
           console.log("removed club from DB");
           firebase.database().ref('Users/'+user.uid+'/BookClub/'+clubId).remove();
            console.log("removed  user from club in DB");

         } catch (e) {
            console.error(e);
          }
        },
        LeaveClub: async (user,clubName, clubId) => {
          try {
          console.log("removing club", clubName);
          var member = user.uid;

           firebase.database().ref('Users/'+user.uid+'/BookClub/'+clubId).remove();
           console.log("removed  user from DB");

         } catch (e) {
            console.error(e);
          }
        },
        RemoveUser: async (user) => {
          try {

            console.log("user details", user.uid);
            console.log("Current auth user: ", auth().currentUser)

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
        addClub: async (user, clubName) => {
         try {
         console.log("user details:", user);
         console.log("user id:", user.uid);
         var member = user.uid;
            firebase.database().ref('BookClub/').push({
              clubName,
             }).then((data)=>{
              //success callback
              alert("Added Club" + " " + clubName);
              console.log("lets check this", data);


              var wordsId = JSON.stringify(data).split("/");
              for (var i = 0; i < wordsId.length - 1; i++){
                    wordsId[i] += " ";
              }
              console.log(wordsId);
              clubId = wordsId[4].replace("\"","");

             firebase.database().ref('BookClub/'+clubId+'/Members').update({
                                              member,
                                          });
             //update bookclub in users details
             firebase.database().ref('Users/'+user.uid+'/BookClub/'+clubId).update({
                               clubName,
                               clubId, });

              console.log('Adding a new book club' , data)
              console.log('this is the id' , clubId)

              return clubId;



             }).catch((error)=>{
              //error callback
              console.log('error with adding bookclub ' , error)
            });
          }catch (e) {
           console.error(e);
         }
        },
        JoinClub: async (user, clubItem, clubId, clubName) => {
            console.log("adding new member to club with id", user.uid);
            var member = user.uid;
            var userName = user.email;
            console.log("adding new member to club " , clubId);
            console.log("adding new member to club " , userName);
             firebase.database().ref('BookClub/'+clubId+'/Members/').push({
                                      member,
                                      userName,
                                  });
             firebase.database().ref('Users/'+user.uid+'/BookClub/'+clubId).update({
                                            clubName,
                                            clubId, });
            },
        addBook: async (user, bookName, author, bookSynopsis,bookPub,bookGenre,bookImage, currentBook) => {
         try {
         console.log("user details:", user);
            firebase.database().ref('Users/'+user.uid+'/BookList').push({
              bookName,
              author,
              bookSynopsis,
              bookPub,
              bookGenre,
              bookImage,
              currentBook
             }).then((data)=>{
              //success callback
              alert("Added Book" + " " + bookName);
               return true;
              console.log('Adding book to users personal collection' , data)
             }).catch((error)=>{
              //error callback
              return false;
              console.log('error with adding book to personal list ' , error)
            });
          }catch (e) {
           console.error(e);
         }
        },
        addBookToClub: async (user, bookName, author, bookSynopsis,bookPub,bookGenre,bookImage, id, currentBook) => {
         try {
         console.log("checking value of id", id);
              firebase.database().ref('BookClub/'+id+'/BookList').push({
                bookName,
                author,
                bookSynopsis,
                bookPub,
                bookGenre,
                bookImage,
                currentBook
               }).then((data)=>{
                //success callback
                alert("Added Book" + " " + bookName);
                 return true;
                console.log('Adding book to users personal collection' , data)
               }).catch((error)=>{
                //error callback
                return false;
                console.log('error with adding book to personal list ' , error)
              });
          }
          catch (e) {
           console.error(e);
         }

        },
       updateReviewBook: async ( bookId, user, review) => {
                try {

                   firebase.database().ref('Users/'+user.uid+'/BookList/'+bookId).update({
                     review
                    }).then((data)=>{
                     console.log('Adding review to users personal collection' , data)
                    }).catch((error)=>{
                     console.log('error with adding review to personal list ' , error)
                   });
                 }catch (e) {
                  console.error(e);
                }
               },
      readReviewBook: async ( bookId, user, review) => {
               try {

                  firebase.database().ref('Users/'+user.uid+'/BookList/'+bookId).update({
                    review
                   }).then((data)=>{
                    console.log('Adding review to users personal collection' , data)
                   }).catch((error)=>{
                    console.log('error with adding review to personal list ' , error)
                  });
                }catch (e) {
                 console.error(e);
               }
            },
       updateReviewBookClub: async ( bookId, user, review) => {
          try {

             firebase.database().ref('BookClub/'+user+'/BookList/'+bookId).update({
               review
              }).then((data)=>{
               console.log('Adding review to users personal collection' , data)
              }).catch((error)=>{
               console.log('error with adding review to personal list ' , error)
             });
           }catch (e) {
            console.error(e);
          }
         },

        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};