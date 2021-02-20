import React, { useContext, Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,SafeAreaView, FlatList,ScrollView } from 'react-native';
import FormButton from '../components/FormButton';
import JoinButton from '../components/JoinButton';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsEntypo from 'react-native-vector-icons/Entypo';


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.clubName}> <IconsEntypo name="sports-club" size={20} /> {item.clubName}</Text>
    </TouchableOpacity>
);
const renderItem = ({ item }) => (
   <Item clubName={item.clubName} />
);

export default function BookClubAccount() {
  const { user, logout, JoinClub } = useContext(AuthContext);
  const navigation = useNavigation();
  const [clubName, setClub] = useState('');

  var ClubList = new Array();
  const [selectedId, setSelectedId] = useState(null);
  const [clubListState, setCLubListState] = useState(ClubList);

  const addElement = (ClubList) => {
      var newArray = ClubList;
      setCLubListState(newArray);
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
      console.log("working on displaying ClubList from personal account");
      return firebase.database().ref('Users/'+user.uid+'/BookClub').once('value');
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

      console.log("should be book-club dict", response[keys[0]]);
      var innerKeys = Object.keys(response[keys[0]]);
      var keyOne = innerKeys[0];
      console.log("should be bookName keys", innerKeys[0] );

      var i = 0;
      Object.entries(response).forEach(([id, value]) => {
          ClubList[i] = {};
          ClubList[i]["id"] = id;
          Object.entries(response[id]).forEach(([key, val]) => {
              ClubList[i][key] = val;
              console.log(key, val);
          });
          i += 1;
      });
      console.log("here is a club", ClubList)
      addElement(ClubList);
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
      <Text style={styles.text}> BookClub </Text>
      <JoinButton buttonTitle='Create BookClub' onPress={() =>  navigation.navigate('AddClub')} />

      <Text style={styles.text}> Your Current BookClubs </Text>

      <SafeAreaView  style = {styles.list} >
                <FlatList
                  data={clubListState}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                />
       </SafeAreaView>

      <Text style={styles.text}> Join a book Club </Text>
       <TouchableOpacity
         style={styles.navButton}
        onPress={() => JoinClub(user, clubName)}>
         <Text style={styles.navButtonText}>Join BookClub </Text>
       </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  text: {
    fontSize: 20,
    color: '#333333',
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
      }
});