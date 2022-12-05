import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
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
    correct: number
}

interface ProfielParm {
    profiel: Profiel,
    color: string,
    total: number,
    procent: number,
    navigation: any,
    setEdit: { (edit: boolean): void },
    profielId: number,
    setprofielId: { (id: number): void }
}

export const Profiel = ({ profiel, color, total, procent, navigation, setEdit, profielId, setprofielId }: ProfielParm) => {
    return (<>
        <View style={styles.top}>
            <View style={styles.img}></View>
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
                {profielId == profiel.id ?
                    <Button func={() => { }} name="Selected" backColor={darkBlue} borderColor={darkBlue} textColor="lightgrey"></Button> :
                    <Button func={() => { profielId = profiel.id; setprofielId(profielId); }} name="Select" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                }
                <Button func={() => { setEdit(true) }} name="Edit" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
            </View>
        </View>
    </>)
}