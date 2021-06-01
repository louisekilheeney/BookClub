//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React, { useContext, Component, useState, useEffect} from 'react';
import { View,Icon, Text,Body, StyleSheet, ScrollView, Link, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, Image, ListView } from 'react-native';
import FormButton from '../components/FormButton';
import DisplayData from '../components/DisplayData';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import List from '../components/readData';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.bookName}> <IconsFeather name="book-open" size={20} /> {item.bookName} </Text>
        </TouchableOpacity>
        );
//    const renderItem = ({ item }) => (
//       <Item bookName={item.bookName} />
//        );
    const NextBook = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.bookName}> <IconsFeather name="book-open" size={20} /> {item.bookName} </Text>
        </TouchableOpacity>
        );



export default function HomeLandingScreen() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    var bookList = new Array();
    var bookIdList = {};
    var books = {};
    var genre = ""
    var bookrec  = new Array();
    const [selectedId, setSelectedId] = useState(null);
    const [bookListState, setBookListState] = useState(bookList);
    const [bookState, setBookState] = useState(bookrec);


    const addElement = (bookList) => {
        var newArray = bookList;
        setBookListState(newArray);
      }

    const addElementBook = (bookrec) => {
        var newArray = bookrec;
        setBookState(newArray);
      }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#1f7a8c" : "#1f7a8c";
        console.log("item data", item.currentBook);

        return (
            <Item
                item={item}
                onPress={() =>  setBookListState }
                style={{ backgroundColor }}
            />
        );
    };

    const renderBook = ( bookrec ) => {
       const backgroundColor = "#1f7a8c";
       console.log("item what is in there", bookrec);
           return (
               <Item
                   bookrec={bookrec}
                   onPress={() =>  setBookState }
                   style={{ backgroundColor }}
               />
            );
        };

    function getListings(){
        console.log("Fetching data from db for PersonalAccount page for user: " + user.uid);
        firebase.database()
            .ref('Users/'+user.uid+'/BookList')
                .on('value', (snapshot) => {
                       setListing(snapshot);
                   });
    }

    function setListing(snapshot){
        console.log("Attempting to set the books for user: " + user.uid);
        var snapValue = snapshot.val()
        if (!snapValue){
            console.log("Failed to get books response data for user: " + user.uid);
            return;
        }

        var bookIds = Object.keys(snapValue);
        if(!bookIds){
            console.log("Failed to get keys for user: " + user.uid);
            return;
        }
        // Manipulating data into a form the view can understand.
        var i = 0;
        Object.entries(snapValue).forEach(([id, value]) => {
            if(snapValue[id]["currentBook"] == true)
            {
                bookList[i] = {};
                bookList[i]["id"] = id;
                Object.entries(snapValue[id]).forEach(([key, val]) => {
                    bookList[i][key] = val;
                });
                i += 1;
            }
        });
        console.log("Completed the book list for user: " + user.uid);
        console.log("Completed the book list for user: " + bookList);
    }

    function showError(e){
        console.log("show error",e);
    }

    function getBooks(){
      firebase.database().ref('Users/').on('value', (usersIdsList) => {
           console.log("users", usersIdsList)
           getBookIds(usersIdsList)
       });
    }

    function getBookIds(usersIdsList){
        var snapValue = usersIdsList.val()

        if (!snapValue){
            console.log("Failed to get books response data for user: " + user.uid);
            return;
        }
        var i = 0;
        Object.entries(snapValue).forEach(([id, value]) => {
            console.log("id", id)
            bookIdList[id] = {};
            i += 1;
        });
        console.log("ids: " + Object.entries(bookIdList));
        Object.entries(bookIdList).forEach(([key, value]) => {
          console.log(key , value); // key ,value
          if(user.uid != key){
             firebase.database().ref('Users/'+key+'/BookList').on('value', (usersIdsBooks) => {
                   console.log("book list for "+key+ " details: ", usersIdsBooks)
                   if(usersIdsBooks.val()){
                       Object.entries(usersIdsBooks.val()).forEach(([id, val]) => {
                          books[id] = val;
                          console.log(id,val);
                       });
                       console.log("final book list", books);
                   }
              });
          }
        makeRecommendations(books);
        });
    }
    function makeRecommendations(books){
        //if current user reviewed a genre high suggest another book from that same genre high and one random one from the collection of books
        console.log("here is the collection of books", books);
            firebase.database()
            .ref('Users/'+user.uid+'/BookList')
                .on('value', (snapshot) => {

                      var randomBook = Math.floor(Math.random() * snapshot.numChildren());
                      var t = 0;
                      console.log("This is the users books", snapshot.child("-MWtJTwuftK5gO92P9TQ"));
                      Object.entries(snapshot.val()).forEach(([id, val]) => {
                          if (t == randomBook){
                          console.log(val);
                              genre = val["bookGenre"];
                          }
                          t += 1;
                      });
                      console.log("genre", genre);
                      Object.entries(books).forEach(([nextBookId, nextBookVal]) => {
                            if(nextBookVal.bookGenre == genre){
                                console.log("books", nextBookId);
                                console.log("books", nextBookVal);
                                bookrec = nextBookVal;
                                console.log("this is the book", bookrec)
                                console.log("this is the bookName", bookrec.bookName)
                                renderBook(bookrec);
                            }
                      });
                   });
    }

    getListings();
    getBooks();

   return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../logo/bookClubLogo.png')} />
        <Text style={styles.text}>Welcome {user.email}</Text>
        <Text style={styles.text}>Your Current books</Text>
          <SafeAreaView  style = {styles.list} >
              <FlatList
                data={bookListState}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
        </SafeAreaView>
        <Text style={styles.text}>Recommended for you</Text>
         <SafeAreaView  style = {styles.recBook} >
             <Text style={styles.text}>{bookrec.bookName} By {bookrec.author}</Text>
         </SafeAreaView>
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
    fontSize: 18,
    color: '#022b3a'
  },
  item: {
    backgroundColor: '#a3cef1',
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
    },
  scrollView: {
     marginHorizontal: 5,
    },
  bookName: {
     fontSize: 20,
     marginVertical: 0,
     marginHorizontal: 0,
     height:24,
     width:800,
     padding: 0,
     flex: 1,
     justifyContent: 'center',
     alignSelf:"center",
     color: "white"
   },
  list: {
     backgroundColor: '#ebebeb',
     borderRadius: 20,
     borderWidth: 0.5,
     borderColor: '#000',
     padding: 10,
     margin: 10,
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
    },
    recBook: {
     backgroundColor: '#ebebeb',
     borderRadius: 20,
     borderWidth: 0.5,
     borderColor: '#000',
     padding: 20,
     margin: 10,
     justifyContent: 'center',
     alignItems: 'center'
    },
  HeadLine:{
     fontSize: 25,
     color: '#022b3a',
     padding: 10
   },
  Icon: {
   justifyContent: 'space-between'
  },
  image: {
    width: 200, height: 200
  }
});