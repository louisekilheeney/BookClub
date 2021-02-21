'use strict';

import React, {Component} from 'react';
//import ReactNative from 'react-native';
import { Viev, TouchableOpacity, FlatList, SafeAreaView, Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimension';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsMaterialIcons from 'react-native-vector-icons/MaterialIcons';


class DisplayData extends Component {

constructor(props) {
    super(props);
    this.bookListState = props;
    }
  render() {
    return (
     <SafeAreaView  style = {styles.list} >
               <FlatList
                 data={bookListState}
                 renderItem={renderItem}
                 keyExtractor={(item) => item.id}
                 extraData={selectedId}
               />
      </SafeAreaView>
    );
  }
}

module.exports = DisplayData;

const styles = StyleSheet.create({

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