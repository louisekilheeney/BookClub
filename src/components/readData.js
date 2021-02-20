
import React, { useContext, Component } from 'react';
import { Text, View, TouchableOpacity,ScrollView, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimension';
import auth from '@react-native-firebase/auth';
import { firebase } from '../config';

class List extends Component {

   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View style={styles.list} >

            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     separator = {styles.separator}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.bookName}
                     </Text>
                  </TouchableOpacity>
               ))
            }

         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
padding: 10,
      marginTop: 3,
      backgroundColor: '#bfdbf7',
      alignItems: 'center',
      width: windowWidth / 2,
          height: windowHeight / 15,
   },
   text: {
      color: '#4f603c'
   },
    separator: {
      height: 0.5,
      width: "100%",
      backgroundColor: "#000"
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
})