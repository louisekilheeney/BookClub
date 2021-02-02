import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function PersonalCollection({navigation}) {

     const onFooterLinkPress = () => {
            navigation.navigate('Login')
        }

  <View style={styles.container}>

        <View style={styles.footerView}>
            <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
  </View>
}