import { createHomeStyles } from '@/assets/styles/home.style';
import UseTheme from '@/app/hooks/UseTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react'
import { Text, View } from 'react-native'

const Header =()=> {
    const {colors} = UseTheme();
    const homeStyles = createHomeStyles(colors);
    return (
      <View style={homeStyles.header}>
        <View style={homeStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
                <Ionicons name='car' size={28} color="#fff"/>
            </LinearGradient>
        <View style={homeStyles.titleTextContainer }>
            <Text style={homeStyles.title}>Ride</Text>
            <Text style={homeStyles.subtitle}>Your ride companion</Text>
        </View>
        </View>
      </View>
    );
};

export default Header
