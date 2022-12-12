import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import Constants from "expo-constants";

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Detail } from "./detail";
import { Button } from "../../algemeen/button"
import { styles } from "./profielPage";
import { useState } from 'react';

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number,
    imgUri?: string
}

interface ProfielParm {
    profiel: Profiel,
    color: string,
    total: number,
    procent: number,
    navigation: any,
    setEdit: { (edit: boolean): void },
    playerId: number,
    setPlayer: { (id: number): void }
}

export const Profiel = ({ profiel, color, total, procent, navigation, setEdit, playerId, setPlayer }: ProfielParm) => {
    return (<>
        <View style={styles.top}>
            <View style={styles.imgContainer}>
                {profiel.imgUri ?
                    <Image style={styles.img} source={{ uri: profiel.imgUri }} /> :
                    <Image style={styles.img} source={require("../NoImg.png")} />
                }
            </View>
            <Text style={styles.name}>{profiel.name}</Text>
        </View>
        <View style={styles.bottom}>
            <View style={styles.procent}>
                <Text style={[styles.procentText, { fontSize: normalTextSize * 2.5, color: color }]}>{procent}%</Text>
                <Text style={[styles.procentText, { color: color }]}>Correct</Text>
            </View>
            <View style={styles.details}>
                <Detail title='Total question:' info={total.toString()}></Detail>
                <Detail title='Correct answer:' info={profiel.correct.toString()}></Detail>
                <Detail title='Wrong answer:' info={profiel.wrong.toString()}></Detail>
            </View>
            <View style={styles.opties}>
                <Button func={() => { navigation.push('Profielen') }} name="Back" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                {playerId == profiel.id ?
                    <Button func={() => { }} name="Selected" backColor={darkBlue} borderColor={darkBlue} textColor="lightgrey"></Button> :
                    <Button func={() => { setPlayer(profiel.id); }} name="Select" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                }
                <Button func={() => { setEdit(true) }} name="Edit" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
            </View>
        </View>
    </>)
}