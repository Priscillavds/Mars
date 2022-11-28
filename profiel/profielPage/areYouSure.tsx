import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Constants from "expo-constants";

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Detail } from "./detail";
import { Button } from "../../algemeen/button"
import { useState } from 'react';

interface AreYouSureParm {
    sure: string,
    setEdit: { (edit: boolean): void },
    setSure: { (sure: string): void }
}

export const AreYouSure = ({ sure, setEdit, setSure }: AreYouSureParm) => {
    return (
        <View style={styles.areYouSure}>
            <Text style={[styles.areYouSureText, { fontSize: normalTextSize * 2 }]}>Are You Sure?</Text>
            <Text style={styles.areYouSureText}>{sure}</Text>
            <View style={styles.yesNo}>
                <Button func={() => { setEdit(false); setSure("") }} name="Yes" backColor={"black"} borderColor={"black"} textColor="white"></Button>
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