import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import Constants from "expo-constants";


import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number
}

export const ExempleProfiel = ({ profiel, rank }: { profiel: Profiel, rank: number }) => {
    return (
        <View style={styles.container}>
            <View style={styles.img}></View>
            <View style={styles.TextContainer}>
                <Text style={styles.Text}>{rank}</Text>
                <Text style={styles.Text}>{profiel.name}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        //paddingTop: Constants.statusBarHeight,
        flexDirection: "row",
        justifyContent:"space-around",
        marginBottom:normalTextSize*.5,
        backgroundColor:lightBlue,
    },

    TextContainer: {
        width:"60%",
        justifyContent:"space-between",
        padding:normalTextSize,
        paddingLeft:0,
        paddingRight:0,
    },
    Text: {
        textAlign:"center",
        fontSize: normalTextSize,
        color:darkBlue
    },

    img: {
        width: 100,
        height: 100,
        backgroundColor: "lightgrey",
        borderRadius: 10000,
        borderColor: darkBlue,
        borderWidth: normalTextSize * .15,
        alignSelf:"center"
    },

});