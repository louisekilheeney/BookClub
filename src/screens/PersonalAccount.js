import React, { useContext, Component, useState, useEffect} from 'react';
import { View,Icon, Text,Body, StyleSheet, ScrollView, Link, TouchableOpacity, FlatList, SafeAreaView, RefreshControl } from 'react-native';
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

export default function PersonalAccount() {
    const { user, readUserData } = useContext(AuthContext);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
      const toggleFunction = () => {
        setToggle(!toggle);
      };
    var bookList = new Array();

    const [selectedId, setSelectedId] = useState(null);
    const [bookListState, setBookListState] = useState(bookList);
    const [refreshing, setRefreshing] = React.useState(false);


    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(200).then(() => setRefreshing(false));
        getListings();
    }, []);

      const [expandable, setExpandable] = useState(false);
      //const [titleColor, setTitleColor] = useState(colors.blue.primary)

      const onPress = () => {
        if (!expandable) {
          setExpandable(true);
          //setTitleColor(colors.blue.secondary);
        }
        else {
          setExpandable(false);
          s//etTitleColor(colors.blue.primary);
        }
      };

    const addElement = (bookList) => {
        var newArray = bookList;
        setBookListState(newArray);
      }

    const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#a3cef1" : "#00aaff";


    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={() => toggleFunction()} style={[styles.item, style]}>
            <Text style={styles.bookName}> <IconsFeather name="book-open" size={20} /> {item.bookName}<IconsMaterialIcons name="keyboard-arrow-right" size={20} /></Text>
        </TouchableOpacity>
        );
    const renderItem = ({ item }) => (
       <Item bookName={item.bookName} />
        );
    return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id),setBookListState, navigation.navigate('bookDetails', {item: item})}
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
            bookList[i] = {};
            bookList[i]["id"] = id;
            Object.entries(snapValue[id]).forEach(([key, val]) => {
                bookList[i][key] = val;
                //console.log("Key:", key, "val:", val);
            });
            i += 1;
        });
        console.log("Completed the book list for user: " + user.uid);
    }

    function showError(e){
        console.log("show error",e);
    }
    getListings();
    //refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  return (
    <View style={styles.container}   >
            <Text style={styles.HeadLine}>Personal Account</Text>
            <FormButton buttonTitle='AddBook' onPress={() =>  navigation.navigate('AddBook')} />
       <Text style={styles.HeadLine}>Current BookList </Text>
       <SafeAreaView  style = {styles.list}   >
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
     borderRadius: 20,
     borderWidth: 0.5,
     borderColor: '#000',
     padding: 10,
     margin: 10,
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