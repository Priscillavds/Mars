import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Constants from "expo-constants";

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Detail } from "./detail";
import { Button } from "../../algemeen/button"

import { useState } from 'react';

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number,
    imgUri?: string
}

interface AreYouSureParm {
    profiel: Profiel,
    updateProfiel: { (id: number, newProfiel: Profiel): void },
    deleteProfiel: { (id: number,check:boolean): void }
    sure: string,
    setEdit: { (edit: boolean): void },
    setSure: { (sure: string): void },
    name: string,
    navigation: any,
    check:boolean
    imgUri?: string
}

export const AreYouSure = ({ profiel, updateProfiel, deleteProfiel, sure, setEdit, setSure, name, navigation, check, imgUri }: AreYouSureParm) => {
    const resetFunc = () => {
        updateProfiel(profiel.id, { id: 87, name: profiel.name, wrong: 0, correct: 0, imgUri: profiel.imgUri })
    }

    const saveFunc = () => {
        updateProfiel(profiel.id, { id: 87, name: name, wrong: profiel.wrong, correct: profiel.correct, imgUri: imgUri })
    }

    const deleteFunc = () => {
        deleteProfiel(profiel.id, check)
        navigation.push('Profielen')
    }

    const action = () => {
        switch (sure) {
            case "To Reset":
                resetFunc()
                break;
            case "To Save":
                saveFunc()
                break;
            case "To Remove":
                deleteFunc()
                break;
        }
    }

    return (
        <View style={styles.areYouSure}>
            <Text style={[styles.areYouSureText, { fontSize: normalTextSize * 2 }]}>Are You Sure?</Text>
            <Text style={styles.areYouSureText}>{sure}</Text>
            <View style={styles.yesNo}>
                <Button func={() => { setEdit(false); setSure(""); action() }} name="Yes" backColor={"black"} borderColor={"black"} textColor="white"></Button>
                <Button func={() => { setEdit(false); setSure("") }} name="No" backColor={"black"} borderColor={"black"} textColor="white"></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    areYouSure: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: Constants.statusBarHeight,
        lef: 0,
        backgroundColor: "rgba(255,255,255,.75)",
        justifyContent: "center"
    },
    areYouSureText: {
        fontSize: normalTextSize,
        textAlign: "center"
    },
    yesNo: {
        width: "50%",
        height: "25%",
        justifyContent: "space-around",
        alignSelf: "center"
    }
});