import React, { useContext, Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,SafeAreaView, FlatList,ScrollView } from 'react-native';
import FormButton from '../components/FormButton';
import JoinButton from '../components/JoinButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.clubName}> <IconsFontAwesome name="group" size={20} /> {item.clubName} </Text>
    </TouchableOpacity>
);
const render = ({ item }) => (
   <Item clubName={item.clubName} />
);

export default function BookClubAccount() {
  const { user, logout, JoinClub } = useContext(AuthContext);
  const navigation = useNavigation();
  const [clubName, setClub] = useState('');

  var ClubList = new Array();
  var ClubListClub = new Array();
  const [selectedId, setSelectedId] = useState(null);
  const [clubListState, setCLubListState] = useState(ClubList);
  const [clubListStateClub, setCLubListStateClub] = useState(ClubListClub);

  const addElement = (ClubList) => {
      var newArray = ClubList;
      setCLubListState(newArray);
    }
  const addElementClub = (ClubListClub) => {
      var newArrayClub = ClubListClub;
      setCLubListStateClub(newArrayClub);
    }

  const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#a3cef1" : "#1f7a8c";
  return (
          <Item
              item={item}
              onPress={() =>  navigation.navigate('BookClubLandingScreen', {_item: item},setCLubListState,setCLubListStateClub)}
              style={{ backgroundColor }}
          />
      );
  };


  const joinClub = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#a3cef1" : "#1f7a8c";
  console.log("whats in here", item);
  return (
          <Item
              item={item}
              onPress={() =>  navigation.navigate('requestScreen', {clubItem: item},setCLubListState,setCLubListStateClub)}
              style={{ backgroundColor }}
          />
      );
  };

  var getListings = function(){
      console.log("working on displaying ClubList from personal account");
      firebase.database().ref('Users/'+user.uid+'/BookClub').on('value', (snapshot) => {
                                                                           setListing(snapshot); });
}
var getListingsForClub = function(){
      console.log("working on displaying ClubList from personal account");
      firebase.database().ref('BookClub').on('value', (snapshot) => {setListingForClub(snapshot); });
    }

  function setListing(snapshot){
          console.log("Attempting to set the book clubs registered for user: " + user.uid);
          var snapValue = snapshot.val()
          if (!snapValue){
              console.log("Failed to get ook clubs registered response data for user: " + user.uid);
              return;
          }
          var ClubIds = Object.keys(snapValue);
          if(!ClubIds){
              console.log("Failed to get keys for user: " + user.uid);
              return;
          }
          // Manipulating data into a form the view can understand.
          var i = 0;
          Object.entries(snapValue).forEach(([id, value]) => {
              ClubList[i] = {};
              ClubList[i]["id"] = id;
              Object.entries(snapValue[id]).forEach(([key, val]) => {
                  ClubList[i][key] = val;
                  console.log("personal clubs Key:", key, "val:", val);
              });
              i += 1;
          });
          console.log("Completed the book club List for user: " + user.uid);
      }
    function setListingForClub(snapshot){
            console.log("Attempting to set the book clubs registered for user: " + user.uid);
            var snapValue = snapshot.val()
            if (!snapValue){
                console.log("Failed to get ook clubs registered response data for user: " + user.uid);
                return;
            }
            var ClubIds = Object.keys(snapValue);
            if(!ClubIds){
                console.log("Failed to get keys for user: " + user.uid);
                return;
            }

            // Manipulating data into a form the view can understand.
            var i = 0;
            Object.entries(snapValue).forEach(([id, value]) => {
                ClubListClub[i] = {};
                ClubListClub[i]["id"] = id;
                Object.entries(snapValue[id]).forEach(([key, val]) => {
                    ClubListClub[i][key] = val;
                    console.log("clubs not joined Key:", key, "val:", val);
                });
                i += 1;
            });
            //console.log("Completed the book club List for user: " + user.uid);
        }
         getListings();
         getListingsForClub();


  return (
    <View style={styles.container}>
      <Text style={styles.HeadLine}> BookClubs </Text>
      <JoinButton buttonTitle='Create BookClub' onPress={() =>  navigation.navigate('AddClub')} />
      <Text style={styles.text}> Your Current BookClubs </Text>
      <SafeAreaView  style = {styles.list} >
        <FlatList
          data={clubListState}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId} />
       </SafeAreaView>
      <Text style={styles.text}> Join a book Club </Text>
        <SafeAreaView  style = {styles.list} >
          <FlatList
            data={clubListStateClub}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId} />
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
        fontSize: 20,
        color: '#022b3a',
        padding : 10,
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
    clubName: {
        fontSize: 20,
        marginVertical: 0,
        marginHorizontal: 0,
        height:24,
        width:800,
        padding: 0,
        flex: 1,
        justifyContent: 'center',
        alignSelf:"center",
        color: 'white'
      },
    list: {
       backgroundColor: '#ebebeb',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
     HeadLine:{
       fontSize: 25,
       color: '#022b3a',
       padding: 10
      }
});