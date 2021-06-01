

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import FormButton from '../components/FormButton';
import RemoveButton from '../components/RemoveButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsMaterialIcons from 'react-native-vector-icons/MaterialIcons';

 const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.bookName}> <IconsFeather name="book-open" size={20} /> {item.userName} </Text>

    </TouchableOpacity>
    );
const renderItem = ({ item }) => (
   <Item bookName={item.userName} />
    );

export default function GroupInfo({route}) {
  const { user, logout, getClubMembers, RemoveClub, LeaveClub } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user);
  const {item } = route.params;
  console.log("item in general page", item);
  var clubId = item.clubId;
  var clubName = item.clubName;
  var bookList = new Array();
  const [selectedId, setSelectedId] = useState(null);
  const [bookListState, setBookListState] = useState(bookList);
  console.log(user);

  const addElement = (bookList) => {
      var newArray = bookList;
      setBookListState(newArray);
    }

  const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#a3cef1" : "#1f7a8c";
  return (
          <Item
              item={item}
              onPress={() =>  setBookListState }
              style={{ backgroundColor }}
          />
      );
  };

  function getListings(){
      firebase.database().ref('BookClub/'+clubId+'/Members').on('value', (snapshot) => {
                     setListing(snapshot);
                 });
  }

  function setListing(snapshot){
      var snapValue = snapshot.val()
      console.log("members list: ", snapValue);
      if (!snapValue){
          console.log("Failed to get memebers response data ");
          return;
      }

      var bookIds = Object.keys(snapValue);
      if(!bookIds){
          console.log("Failed to get keys for user: " + user.uid);
          return;
      }

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
  getListings();

  return (
    <View style={styles.container}>

      <Text style={styles.header}> Club Name:  {item.clubName} </Text>
      <Text style={styles.header}> Club ID:  {item.id} </Text>
      <Text style={styles.header}> Members:  </Text>
        <SafeAreaView  style = {styles.list} >
        <FlatList
          data={bookListState}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
       </SafeAreaView>
      <RemoveButton buttonTitle='Delete club' onPress={() => RemoveClub(user, clubName, clubId)} />
      <RemoveButton buttonTitle='Leave club' onPress={() => LeaveClub(user, clubName, clubId)} />

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
         fontSize: 30,
         color: '#022b3a',

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
        color: "white"
      },
    list: {
       backgroundColor: '#ebebeb',
       borderRadius: 10,
       borderWidth: 0.5,
       padding: 10,
       margin: 10,
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
      },
     header:{
       fontSize: 20,
       color: '#022b3a',
       paddingTop: 10,
       paddingBottom: 20
      }
});