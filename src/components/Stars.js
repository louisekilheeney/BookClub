//code is derived/used and modified from: https://reactnativeexample.com/react-native-component-for-generating-and-displaying-interactive-star-ratings/
// Author: React Native Example
// last accessed on: 01/06/2021

import React, {Component, useContext} from 'react';
import StarRating from 'react-native-star-rating';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text } from 'react-native';

class stars extends Component {
  constructor(props) {
    super(props);
    // read start count from the database.
    console.log("This is in starCount: ", this.props.bookId)
    console.log("This is in starUser: ", this.props.userId)
    console.log("This is in star: ", this.props.getStars)

    this.state = {
      starCount: this.props.getStars
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    console.log("show not call yet till pressed");
    this.props.parentCallBack(this.props.bookId, this.props.userId, rating);

    // save it to the data base
  }

  render() {
    return (
       <View>
      <Text> Current review {this.state.starCount} </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
   </View> );
  }
}

export default stars