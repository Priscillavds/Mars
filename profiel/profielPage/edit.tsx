import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Keyboard, Text, View, TextInput, ScrollView, Image } from 'react-native';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { Detail } from "./detail";
import { Button } from "../../algemeen/button"
import { styles } from "./profielPage";
import { useState, useEffect } from 'react';

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number,
    imgUri?: string
}

interface EditParm {
    profiel: Profiel,
    color: string,
    total: number,
    procent: number,
    setSure: { (sure: string): void },
    name: string,
    setName: { (name: string): void }

    SetImgUri: { (name: string): void }
    imgUri?: string,
}

export const Edit = ({ profiel, color, total, procent, setSure, name, setName, imgUri, SetImgUri }: EditParm) => {
    const [keyboard, seKeyboard] = useState<boolean>(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => seKeyboard(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => seKeyboard(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            SetImgUri(result.assets[0].uri);
        }
    };


    return (<>
        <View style={[styles.top, keyboard && { height: "100%" }]}>
            <View style={styles.imgContainer}>
                {imgUri ?
                    <Image style={styles.img} source={{ uri: imgUri }} /> :
                    <Image style={styles.img} source={require("../NoImg.png")} />
                }
                <Button func={() => { pickImage() }} name="Edit" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>
                {imgUri && <Button func={() => { SetImgUri("") }} name="Remove" backColor={lightPurple} borderColor={darkPuple} textColor="white"></Button>}
            </View>
            <TextInput style={styles.input} value={name} onChangeText={text => setName(text)} />
        </View>

        {!keyboard &&
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
        }
    </>
    )
}