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

interface EditParm {
    profiel: Profiel,
    color: string,
    total: number,
    procent: number,
    navigation: any,
    setEdit: { (edit: boolean): void },
    setSure: { (sure: string): void }
}

export const Edit = ({ profiel, color, total, procent, navigation, setEdit, setSure }: EditParm) => {
    return (<>
        <View style={styles.top}>
            <View style={styles.img}>
                <Button func={() => { }} name="Edit" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
            </View>
            <TextInput style={styles.input} value={profiel.name} />
        </View>
        <View style={styles.bottom}>
            <View style={styles.procent}>
                <Text style={[styles.procentText, { fontSize: normalTextSize * 2.5, color: color }]}>{procent}%</Text>
                <Text style={[styles.procentText, { color: color }]}>Correct</Text>
                <View style={styles.reset}><Button func={() => { setSure("To Reset") }} name="Reset" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button></View>
            </View>
            <View style={styles.details}>
                <Detail title='Total question:' info={total.toString()}></Detail>
                <Detail title='Correct answer:' info={profiel.correct.toString()}></Detail>
                <Detail title='Wrong answer:' info={profiel.wrong.toString()}></Detail>
            </View>
            <View style={styles.opties}>
                <Button func={() => { setSure("To Remove") }} name="Remove" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                <Button func={() => { setSure("To Save") }} name="Save" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
            </View>
        </View>
    </>
    )
}