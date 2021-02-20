import React, { useContext, Component, useState, useEffect} from 'react';
import { View,Icon, Text,Body, StyleSheet, ScrollView, Link, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import List from '../components/readData';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>

        <Text style={styles.bookName}> <IconsFeather name="book-open" size={20} /> {item.bookName}<IconsMaterialIcons name="keyboard-arrow-down" size={20} /></Text>

    </TouchableOpacity>
);
const renderItem = ({ item }) => (
   <Item bookName={item.bookName} />

);

export default function PersonalAccount() {
    const { user, readUserData } = useContext(AuthContext);
    const navigation = useNavigation();
    var bookList = new Array();

    const [selectedId, setSelectedId] = useState(null);
    const [bookListState, setBookListState] = useState(bookList);

    const addElement = (bookList) => {
        var newArray = bookList;
        setBookListState(newArray);
      }

    function onBookPress()
    {
        alert("hello gobshite");
    }
    const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#a3cef1" : "#6096ba";
    return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };

    var getListings = function(){
        console.log("working on displaying booklist from personal account");
        return firebase.database().ref('Users/'+user.uid+'/BookList').once('value');
    }

    var response;
    function loadListing(){
        getListings().then(setListing, showError);
    }

    function setListing(snapshot){
        response = snapshot.val()
        console.log("getting response",response);
        console.log("response keys", Object.keys(response));

        var keys = Object.keys(response);

        console.log("should be bookName dict", response[keys[0]]);
        var innerKeys = Object.keys(response[keys[0]]);
        var keyOne = innerKeys[0];
        console.log("should be bookName keys", innerKeys[0] );

        var i = 0;
        Object.entries(response).forEach(([id, value]) => {
            bookList[i] = {};
            bookList[i]["id"] = id;
            Object.entries(response[id]).forEach(([key, val]) => {
                bookList[i][key] = val;
                console.log(key, val);
            });
            i += 1;
        });
        console.log("here is a book", bookList)
        addElement(bookList);
    }


    function showError(e){
        console.log("show error",e);
    }

    function grabListingsAndLoadBooks(){
        loadListing();
        console.log("init response",response);
    }

    function init(){
        grabListingsAndLoadBooks();
        grabListingsAndLoadBooks();
    }

    useEffect(() => {
      init();
    }, [])

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
            <Text style={styles.HeadLine}>Personal Account</Text>
            <FormButton buttonTitle='AddBook' onPress={() =>  navigation.navigate('AddBook')} />

        <Text style={styles.HeadLine}>Current BookList </Text>

        <SafeAreaView  style = {styles.list} >
          <FlatList
            data={bookListState}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
        </View>
</ScrollView>
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
    fontSize: 18,
    color: '#333333'
  },
  item: {
      backgroundColor: '#a3cef1',
      padding: 5,
      marginVertical: 1,
      marginHorizontal: 0,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
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
    },
  list: {
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
    HeadLine:{
         fontSize: 25,
         color: '#333333'
    }

});