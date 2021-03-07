import React, { useContext, Component, useState, useEffect} from 'react';
import { View,Icon, Text,Body, StyleSheet, ScrollView, Link, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import FormButton from '../components/FormButton';
import DisplayData from '../components/DisplayData';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
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
export default function ClubBookList({route}) {
    const { user, readUserData } = useContext(AuthContext);
    const navigation = useNavigation();
    var bookList = new Array();

    console.log("item in club boooooooooooooooooooooooooooook list", route.params["item"]["id"]);
    var clubId = route.params["item"]["id"];
    const [selectedId, setSelectedId] = useState(null);
    const [bookListState, setBookListState] = useState(bookList);

    const addElement = (bookList) => {
        var newArray = bookList;
        setBookListState(newArray);
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

    function getListings(){
        console.log("Fetching data from db for bookClub page for user: " + user.uid);
        firebase.database()
            .ref('Users/'+user.uid+'/BookClub/BookList')
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
            bookList[i] = {};
            bookList[i]["id"] = id;
            Object.entries(snapValue[id]).forEach(([key, val]) => {
                bookList[i][key] = val;
                console.log("Key:", key, "val:", val);
            });
            i += 1;
        });
        console.log("Completed the book list for user: " + user.uid);
    }

    function showError(e){
        console.log("show error",e);
    }

    function init(){
        getListings();
    }

    useEffect(()=>{
         init();
       }, []);
  return (

    <View style={styles.container}>
        <Text style={styles.HeadLine}>Club Books</Text>
        <FormButton buttonTitle='AddBook' onPress={() =>  navigation.navigate('AddBookClub', {id: route.params["item"]["id"]})} />
       <SafeAreaView  style = {styles.list} >
         <FlatList
           data={bookListState}
           renderItem={renderItem}
           keyExtractor={(item) => item.id}
           extraData={selectedId}
         />
       </SafeAreaView>


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
     padding: 10,
     margin: 40,
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
    },
   HeadLine:{
     fontSize: 25,
     color: '#333333'
    }

});