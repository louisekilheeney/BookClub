import React, { useContext, useState, setState } from 'react';
import { View, Text, StyleSheet, Switch, Link } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { Rating, AirbnbRating } from 'react-native-elements';
//import StarRating from 'react-native-star-rating';
import Stars from '../components/Stars';


export default function bookDetails({route}) {
  const { user, logout, setCurrentBook } = useContext(AuthContext);
  const navigation = useNavigation();
  const { _item } = route.params;
  const [isEnabled, setIsEnabled] = useState(_item.currentBook);
  console.log("item", _item);
  console.log(user);
  var starCount ="";
  const state = { starCount: 0 };
  const {updateReviewBook } = useContext(AuthContext)


   var handleCallBack = (childData) => {
        starCount = childData;
   }

  function onToggleSwitch(toggled){
        setIsEnabled(toggled);
        _item.currentBook = toggled;
        console.log("this is a current book")
        setCurrentBook(_item.author, _item.bookName, _item.bookSynopsis, _item.bookGenre, _item.id,
         _item.bookImage, _item.bookPub, toggled);
  }

    var bookList = 0;
    const [selectedId, setSelectedId] = useState(null);
    const [bookListState, setBookListState] = useState(bookList);
    console.log(user);
    var  bookId = _item.id;


    function getListings(){
        firebase.database().ref('Users/'+user.uid+'/BookList/'+bookId+'/review').on('value', (snapshot) => {
                       setListing(snapshot);
                   });
    }

    function setListing(snapshot){
        var snapValue = snapshot.val()
        console.log("review: ", snapValue);
        if (!snapValue){
            console.log("Failed to get members response data ");
            return;
        }
        bookList = snapValue;
        console.log("Completed the book list for user: " + user.uid);
        console.log("review value: " + bookList);
    }

    function showError(e){
        console.log("show error",e);
    }
    getListings();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book Name: {_item.bookName} </Text>
      <Text style={styles.text}>Book Author: {_item.author} </Text>
      <Text style={styles.text}>Book Genre: {_item.bookGenre}</Text>
      <Text style={styles.text}>Book Publisher: {_item.bookPub}</Text>
      <Text style={styles.text}>Book synopsis: {_item.bookSynopsis} </Text>
      <Text style={styles.text}>Current Book? </Text>
      <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={_item.isCurrentBook ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(isEnabled) => onToggleSwitch(isEnabled)}
          value={isEnabled}
        />
      <Stars bookId={_item.id} userId={user} parentCallBack={updateReviewBook} getStars={bookList}/>
      <Text> {starCount} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
  },
    synopsis: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
    },
  text: {
    fontSize: 20,
    color: '#274c77',
    paddingBottom: 20
  },
   reviewContainer: {
      backgroundColor: "#ebebeb",
      borderRadius: 10,
      paddingHorizontal: 30,
      paddingVertical: 40,
      minWidth: "80%",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1.0,
      shadowRadius: 2,
      shadowColor: "rgba(193, 211, 251, 0.5)",
      elevation: 5,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#323357",
      textAlign: "center",
    },
});