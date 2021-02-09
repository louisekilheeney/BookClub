import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimension';

class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         }
      ]
   }
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
                        {item.name}
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