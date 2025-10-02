import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export class support extends Component {
   handleBack = () => {
          router.replace('/(home)');

    };
  render() {
    return (
      <View>
        <TouchableOpacity style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack} accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={22} color="#000000ff" style={{ marginRight: 6 }} />
        </TouchableOpacity>
        <Text> Support Screen </Text>

      </View>
    )
  }
}

export default support
