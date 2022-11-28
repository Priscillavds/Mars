import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from "expo-constants";


import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Button } from "../../algemeen/button";
import { profielen } from "../../App";
import { ExempleProfiel } from "./ExempleProfiel";

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number
}


export const Profielen = ({ navigation }: { navigation: any }) => {
    let sortProfielen: Profiel[] = profielen.sort(
        (a: Profiel, b: Profiel) => {
            const totalA: number = a.correct + a.wrong;
            const procentA: number = totalA == 0 ? 0 : Math.round((a.correct / totalA) * 100);
            const totalB: number = b.correct + b.wrong;
            const procentB: number = totalB == 0 ? 0 : Math.round((b.correct / totalB) * 100);

            if (procentA != procentB) { return procentB - procentA; }
            if (totalA != totalB) { return totalB - totalA; }
            return a.id - b.id;
        }
    )


    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    sortProfielen.map((profiel: Profiel, index: number) => {
                        return (
                            <Pressable onPress={() => navigation.push('Profiel', { profiel})}>
                                <ExempleProfiel key={index} profiel={profiel} rank={index + 1}></ExempleProfiel>
                            </Pressable>
                        )
                    })
                }
                <View style={styles.add}>
                    <Button func={() => { }} name="Add" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: "column",
        flex: 1,
        backgroundColor: darkBlue
    },

    add: {
        marginBottom:normalTextSize*.5,
        paddingLeft:normalTextSize * 2,
        paddingRight:normalTextSize * 2
    }
});