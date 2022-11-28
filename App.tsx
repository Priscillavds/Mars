import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert, Button, Image } from 'react-native';
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import Settings from './Settings';
import HomeScreen from './Homescreen';

const Tab = createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "blue",
      }}
      
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({color, size} : any) => <FontAwesome name="home" size={size} color={color} />,
        }} />
      <Tab.Screen name="Settings" component={Settings} options={{
            tabBarIcon: ({color, size} : any) => <MaterialIcons name="settings" size={size} color={color} />
        }} />

    </Tab.Navigator>
  </NavigationContainer>

  );
}

/*
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      

      <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat scelerisque varius morbi. Faucibus turpis in eu mi bibendum neque. Tristique nulla aliquet enim tortor at. Neque ornare aenean euismod elementum nisi quis eleifend. Cursus vitae congue mauris rhoncus aenean vel. Quis eleifend quam adipiscing vitae. Felis imperdiet proin fermentum leo vel orci porta. Neque laoreet suspendisse interdum consectetur libero id faucibus. Nec nam aliquam sem et. Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget.</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      
      <Pressable
                style={styles.pressable}
                onPress={() => {
                    Alert.alert("Pressed!");
                }}
            >
                <Text style={styles.buttontext}>Quiz</Text>
      </Pressable>
      
    </View>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffb7b2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
    
  },
  pressable: {
    backgroundColor: '#ff4032'
  },
  text: {
    color:'#AD2B2B'
  },
  buttontext: {
    color: 'white'
  },
  title: {
    fontSize: 32,
    color: '#ff1100'
  },
  image: {
    width:95,
  }
});

export default App;