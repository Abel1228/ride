import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { Component } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class HomeLayout extends Component {
  state = {
    sidebarOpen: false,
    sidebarAnim: new Animated.Value(-SCREEN_WIDTH * 0.7),
    overlayVisible: false,
    overlayAnim: new Animated.Value(0), // <-- add this for overlay opacity
  };

  handleBack = () => {
    router.replace('/(tabs)/Login');
  };

  toggleSidebar = () => {
    const { sidebarOpen, sidebarAnim, overlayAnim } = this.state;
    if (!sidebarOpen) {
      this.setState({ overlayVisible: true }, () => {
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? -SCREEN_WIDTH * 0.7 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ sidebarOpen: !sidebarOpen });
      if (sidebarOpen) {
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          this.setState({ overlayVisible: false });
        });
      }
    });
  };

  closeSidebar = () => {
    const { sidebarAnim, overlayAnim } = this.state;
    Animated.timing(sidebarAnim, {
      toValue: -SCREEN_WIDTH * 0.7,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ sidebarOpen: false });
    });
    Animated.timing(overlayAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ overlayVisible: false });
    });
  };

  renderSidebar() {
    return (
      <>
        {/* Animated overlay for outside click */}
        {this.state.overlayVisible && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: this.state.overlayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)'],
              }),
              zIndex: 3,
            }}
          >
            <TouchableOpacity
              style={{ width: '100%', height: '100%' }}
              activeOpacity={1}
              onPress={this.closeSidebar}
            />
          </Animated.View>
        )}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: this.state.sidebarAnim,
            width: SCREEN_WIDTH * 0.7,
            height: '100%',
            backgroundColor: '#222',
            paddingTop: 0, // Remove paddingTop here
            zIndex: 4,
          }}
        >
          {/* Profile Section */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#333',
              padding: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            {/* Profile Photo */}
            <View style={{ minHeight:150 ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
            // , borderWidth: 1, borderColor: '#f50808ff', borderStyle: 'solid' 
            }}>  
            <View 
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                overflow: 'hidden',
                marginRight: 16,
                backgroundColor: '#555',
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1, borderColor: '#f50808ff', borderStyle: 'solid' 
              }}
            >
              <Ionicons name="person" size={36} color="#fff" />
              {/* Or use <Image source={require('...')} style={{width: 56, height: 56}} /> for real photo */}
            </View>
            <View style={{ 
              // borderWidth: 1, borderColor: '#f50808ff', borderStyle: 'solid', height: 'auto'  
              }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
              <TouchableOpacity
            onPress={() => router.replace('/(pages)/profile')}
              >     
                <Text style={{ color: '#4fc3f7', fontSize: 14, marginTop: 4 }}>View Profile</Text>
              </TouchableOpacity>
            </View>
            {/* Name and View Profile */}
            </View>
          </View>
          {/* Sidebar options below */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}
            onPress={() => router.replace('/(pages)/settings')}
          >
            <Ionicons name="settings-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>Setting</Text>
          </TouchableOpacity>
          
           <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}
            onPress={() => router.replace('/(pages)/OrderHistory')}
          >
            <Ionicons name="repeat-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>Order History</Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}
            onPress={() => router.replace('/(pages)/support')}
          >
            <Ionicons name="help-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>Support</Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}
            onPress={this.handleBack}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>Logout</Text>
          </TouchableOpacity>

        </Animated.View>
      </>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {/* Floating hamburger menu */}
        {!this.state.sidebarOpen && (
          <TouchableOpacity
            onPress={this.toggleSidebar}
            style={{
              position: 'absolute',
              top: 40,
              left: 20, 
              zIndex: 2,
              backgroundColor: '#222',
              borderRadius: 32,
              padding: 14,
              opacity: 0.5,
              elevation: 5,
            }}
          >
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
          
        )}

        {/* Sidebar and overlay */}
        {this.renderSidebar()}
         <TouchableOpacity
            onPress={
              ()=>
              console.log('Pressed')}
            style={{
              position: 'absolute',
              bottom: 50,
              right: 20, 
              zIndex: 2,
              backgroundColor: '#222',
              borderRadius: 32,
              padding: 14,
              opacity: 0.5,
              elevation: 5,
            }}
          >
            <Ionicons name="sync-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
      </View>
    )
  }
}

export default HomeLayout
