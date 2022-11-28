import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import Constants from "expo-constants";

import { normalTextSize } from '../profiel/styleProfiel'

interface ButtonParmes {
    func: { (): void }
    name: string,
    backColor: string,
    borderColor: string,
    textColor: string
}

export const Button = ({ func, name, backColor, borderColor, textColor }: ButtonParmes) => {
    return (
        <Pressable onPress={func}>
            <View style={[styles.button,{ borderColor:borderColor, backgroundColor:backColor}]} >
                <Text style={[styles.buttonText, {color:textColor}]}>{name}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightgrey",
        borderRadius: 1000,
        borderColor: "grey",
        borderWidth: normalTextSize * .15,
        minWidth: normalTextSize * 6,
    },
    buttonText: {
        color: "white",
        fontSize: normalTextSize,
        textAlign: 'center',
    }
});