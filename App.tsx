import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, StyleSheet, StyleProp, ViewStyle, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import Settings from './Settings';
import { LinearGradient } from "expo-linear-gradient";
import BVLinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
        }}

      >
        <Tab.Screen name="Home" component={Settings} options={{
          tabBarIcon: ({ color, size }: any) => <FontAwesome name="home" size={size} color={color} />,
        }} />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ color, size }: any) => <FontAwesome name="home" size={size} color={color} />,
        }} />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
