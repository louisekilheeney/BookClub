//code is derived/used and modified from: https://stackoverflow.com/questions/63134848/create-a-theme-provider-component-in-react-native
// Author: Stack OverFlow.
// last accessed on: 01/06/2021

import React from "react";
import { lightColors, darkColors } from '../colorThemes'

const Context = React.createContext();

export class ThemeProvider extends React.Component {

  state = {
    theme: lightColors,
    updateTheme: (theme) => {
      this.setState({ theme: theme })
    }
  }

  render() {
    const { theme } = this.state
    return (
      <Context.Provider value={this.state} theme={theme} >
        { this.props.children }
      </Context.Provider>
    )
  }
}

export default ThemeProvider;