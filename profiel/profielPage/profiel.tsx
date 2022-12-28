
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import Constants from "expo-constants";

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Detail } from "./detail";
import { Button } from "../../algemeen/button"
import { styles } from "./profielPage";
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
    player: number,
    updatePlayer: { (id: number): void }
    reload: boolean,
    setReload: { (id: boolean): void }
}

export const Profiel = ({ profiel, color, total, procent, navigation, setEdit, player, updatePlayer, reload, setReload }: ProfielParm) => {

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
        <LinearGradient style={styles.gradient} colors={['rgb(46,117,182)', 'lightblue rgb(189,215,238)']}>
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
                    {player == profiel.id ?
                        <Button func={() => { }} name="Selected" backColor={lightPurple} borderColor={lightPurple} textColor="lightgrey"></Button> :
                        <Button func={() => { updatePlayer(profiel.id); setReload(!reload); }} name="Select" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                    }
                    <Button func={() => { setEdit(true) }} name="Edit" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                </View>
            </View>
        </LinearGradient>
    </>)
}