import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from 'react';
import { Quiz } from './quiz/quiz';
import { Button } from "./algemeen/button";


const HomeScreen = () => {
    const navigation : any = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.text}>Probeer deze moeilijke quiz en leer meer over verschillende onderwerpen. Vergeet zeker geen profiel aan te maken voor je score bij te houden. Zo kan je je score elke keer proberen te verbeteren. 
            Is het nog een beetje te gemakkelijk, dan kan je altijd de settings aanpassen.</Text>
            
            <Image style={styles.tinyLogo} source={require('./assets/logo.png')}
      />
             <Button func={() => navigation.navigate("Quiz")} name="Quiz" backColor='red' borderColor='darkred' textColor="white" ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: '10rem',
        backgroundColor: '#ffb7b2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15

    },
    pressable: {
        backgroundColor: '#ff4032'
    },
    text: {
        fontSize: 18,
        color: '#AD2B2B',
        paddingBottom:20
        
    },
    buttontext: {
        color: 'white'
    },
    title: {
        fontSize: 40,
        color: '#ff1100',
        paddingBottom:20
    },
    image: {
        width: 10,
        paddingBottom:20
    },
    tinyLogo: {
        width:'95%',
        height: "30%"
        
    }
});
export default HomeScreen