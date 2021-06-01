//code is derived/used and modified from: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
// Author: Aman Mittal
// last accessed on: 01/06/2021

import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';


export default function Providers() {
  return (
        <AuthProvider>
          <Routes />
        </AuthProvider>

  );
}