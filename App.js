//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React from 'react';
import Providers from './src/navigation';
import {decode, encode} from'base-64';


if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
export default function App() {
  return <Providers />;
}