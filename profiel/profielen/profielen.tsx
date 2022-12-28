import { Pressable, StyleSheet, View, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { lightPurple, darkPuple, darkBlue, normalTextSize } from "../styleProfiel";
import { Button } from "../../algemeen/button";
import { ExempleProfiel } from "./ExempleProfiel";

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number
}

export const Profielen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [reload,setReload] = useState<boolean>(false);
    const isFocused = useIsFocused();

    useEffect(() => { setReload(!reload); }, [isFocused]);
    
    let sortProfielen: Profiel[] = route.params.profiels.sort(
        (a: Profiel, b: Profiel) => {
            const totalA: number = a.correct + a.wrong;
            const procentA: number = totalA == 0 ? 0 : Math.round((a.correct / totalA) * 100);
            const totalB: number = b.correct + b.wrong;
            const procentB: number = totalB == 0 ? 0 : Math.round((b.correct / totalB) * 100);

            if (procentA != procentB) { return procentB - procentA; }
            if (totalA != totalB) { return totalB - totalA; }
            return a.id - b.id;
        }
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    sortProfielen.map((profiel: Profiel, index: number) => {
                        return (
                            <Pressable key={index} onPress={() => navigation.push('Profiel', { profiel, ...route.params })}>
                                <ExempleProfiel key={index} profiel={profiel} rank={index + 1}></ExempleProfiel>
                            </Pressable>
                        )
                    })
                }
                <View style={styles.add}>
                    <Button func={() => { let profiel = route.params.newProfiel({ id: 87, name: "new Speler", wrong: 0, correct: 0 }); navigation.push('Profiel', { profiel, ...route.params }) }} name="Add" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
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
        marginBottom: normalTextSize * .5,
        paddingLeft: normalTextSize * 2,
        paddingRight: normalTextSize * 2
    }

});