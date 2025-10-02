import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class HomeLayout extends Component {
  state = {
    sidebarOpen: false,
    sidebarAnim: new Animated.Value(-SCREEN_WIDTH * 0.7),
    overlayVisible: false,
    overlayAnim: new Animated.Value(0),
    // Location states
    location: null as { latitude: number; longitude: number } | null,
    errorMsg: null as string | null,
    loading: true,
    address: null as string | null,
  };

  async componentDidMount() {
    this.requestLocation();
  }

  // Request location permission & fetch location
  requestLocation = async () => {
    try {
      this.setState({ loading: true, errorMsg: null, address: null });
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ errorMsg: 'Permission to access location was denied', loading: false });
        Alert.alert('Location Permission', 'Permission to access location was denied.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      // reverse geocode
      let geocode = await Location.reverseGeocodeAsync(coords);
      let address = null;
      if (geocode && geocode.length > 0) {
        const place = geocode[0];
        address = `${place.name || ''} ${place.street || ''}, ${place.city || ''}, ${place.region || ''}`;
      }

      this.setState({
        location: coords,
        loading: false,
        address: address || 'Unknown location',
      });
    } catch (error: any) {
      this.setState({ errorMsg: error.message || 'Could not fetch location', loading: false });
    }
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
            paddingTop: 0,
            zIndex: 4,
          }}
        >
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
            <View style={{ minHeight:150 ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>  
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
                }}
              >
                <Ionicons name="person" size={36} color="#fff" />
              </View>
              <View>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
                <TouchableOpacity>
                  <Text style={{ color: '#4fc3f7', fontSize: 14, marginTop: 4 }}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={{ color: '#fff', fontSize: 18, margin: 16, marginTop: 24 }}>Sidebar Option 1</Text>
          <Text style={{ color: '#fff', fontSize: 18, margin: 16 }}>Sidebar Option 2</Text>
          <Text style={{ color: '#fff', fontSize: 18, margin: 16 }} onPress={this.handleBack}>Logout</Text>
        </Animated.View>
      </>
    );
  }

  render() {
    const { location, loading, errorMsg, address } = this.state;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
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

        {this.renderSidebar()}

        {/* Map Section */}
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator size="large" color="#222" />
              <Text style={{ marginTop: 10 }}>Fetching location...</Text>
            </View>
          ) : errorMsg ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: 'red' }}>{errorMsg}</Text>
            </View>
          ) : location ? (
            <MapView
              style={{ flex: 1 }}
              provider="google"
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              <Marker coordinate={location} title="You are here" description={address || ''} />
            </MapView>
          ) : null}
        </View>

        {/* Address Display */}
        {address && (
          <View style={{ position: 'absolute', top: 100, left: 20, right: 20, backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 5 }}>
            <Text style={{ fontSize: 14 }}>📍 {address}</Text>
          </View>
        )}

        {/* Refresh location button */}
        <TouchableOpacity
          onPress={this.requestLocation}
          style={{
            position: 'absolute',
            bottom: 50,
            right: 20, 
            zIndex: 2,
            backgroundColor: '#222',
            borderRadius: 32,
            padding: 14,
            opacity: 0.7,
            elevation: 5,
          }}
        >
          <Ionicons name="sync-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

export default HomeLayout;
