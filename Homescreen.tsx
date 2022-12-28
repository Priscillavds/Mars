import { StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React from 'react';

import { Button } from "./algemeen/button";
import { LinearGradient } from "expo-linear-gradient";
import { normalTextSize } from './profiel/styleProfiel';

const HomeScreen = () => {
    const navigation: any = useNavigation();
    return (<>
        <LinearGradient style={styles.gradient} colors={["#ffb7b2", "#FFE0E0"]}>
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <Text style={styles.text}>Try this difficult quiz and learn about a lot of different subjects. Don't forget to make a profiel so your score can be kept for you. If you do this then you can try to break your record. Is it to easy, no problem. Go to settings and try the different settings.</Text>
                <Image style={styles.tinyLogo} source={require('./assets/logo.png')} />
                <Button func={() => navigation.navigate("Quiz")} name="Quiz" backColor='red' borderColor='darkred' textColor="white" ></Button>
            </View>
        </LinearGradient>
    </>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: '10rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },

    gradient: {
        height: "100%"
    },

    text: {
        fontSize: normalTextSize * .75,
        color: '#AD2B2B',
        paddingBottom: 20,
        textAlign: "center"
    },

    title: {
        fontSize: 40,
        color: '#ff1100',
        paddingBottom: 20

    },

    tinyLogo: {
        width: '95%',
        height: "30%",
        paddingBottom: 50,
    }
});

export default HomeScreen