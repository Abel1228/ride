import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export class HomeLayout extends Component {
  handleBack = () => {
    router.replace('/(tabs)/Login');
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#ec1818ff'}}>
        {/* Header with back button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <TouchableOpacity onPress={this.handleBack}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12 }}>HomeLayout</Text>
        </View>
        {/* Main content */}
        <Text> HomeLayout </Text>
      </SafeAreaView>
    )
  }
}

export default HomeLayout
