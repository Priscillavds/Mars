import {  StyleSheet,  View } from 'react-native';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { red, oragne, yellow, lightGreen, lightPurple, darkPuple, darkBlue, lightBlue, normalTextSize } from "../styleProfiel";
import { useState,useEffect } from 'react';
import { AreYouSure } from "./areYouSure";
import { Profiel } from "./profiel";
import { Edit } from "./edit";

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number,
    imgUri?:string
}

export const ProfielPage = ({ route, navigation }: { route: any, navigation: any }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [sure, setSure] = useState<string>("");
    const [name, SetName] = useState<string>(route.params.profiel.name)
    const [imgUri, SetImgUri] = useState<string>(route.params.profiel.imgUri)
    const [reload,setReload] = useState<boolean>(false);
    const [player, setPlayer] = useState<number>(0);

    useEffect(() => {
        SetName(profiel.name);
        SetImgUri(profiel.imgUri);
    },[edit])

    const LoadPlayer = async () => {
        let loadPlayer: string | null = await AsyncStorage.getItem("player");
    
        if (loadPlayer != null) setPlayer(parseInt(loadPlayer));
      }
    
      LoadPlayer()
    
    const { profiel, updateProfiel, deleteProfiel, updatePlayer } = route.params;

    const total: number = profiel.correct + profiel.wrong;
    const procent: number = total == 0 ? 0 : Math.round((profiel.correct / total) * 100);

    let color: string = red;
    if (procent > 25) { color = oragne; }
    if (procent > 50) { color = yellow; }
    if (procent > 75) { color = lightGreen; }

    return (
        <View style={styles.container}>
            {edit ?
                <Edit profiel={profiel} color={color} total={total} procent={procent} setSure={setSure} name={name} setName={SetName} imgUri={imgUri} SetImgUri={SetImgUri} ></Edit> :
                <Profiel profiel={profiel} color={color} total={total} procent={procent} navigation={navigation} setEdit={setEdit} player={player} updatePlayer={updatePlayer} reload={reload} setReload={setReload}></Profiel>}
            {sure && <AreYouSure profiel={profiel} updateProfiel={updateProfiel} deleteProfiel={deleteProfiel} sure={sure} setSure={setSure} setEdit={setEdit} name={name} navigation={navigation} check={player == profiel.id} imgUri={imgUri}></AreYouSure>}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: "column", flex: 1,
    },

    top: {
        height: "43%",
        backgroundColor: lightBlue,
        justifyContent: "center",
        alignItems: "center"
    },

    imgContainer: {
        width: 175,
        height: 175,
        backgroundColor: "lightgrey",
        borderRadius: 10000,
        borderColor: darkBlue,
        borderWidth: normalTextSize * .15,
        marginBottom: normalTextSize,
        justifyContent: "flex-end",
        paddingLeft: 125
    },

    img: {
        position:"absolute",
        width: 175 - (normalTextSize * .15 * 2),
        height: 175 - (normalTextSize * .15 * 2),
        top:- (normalTextSize * .0 ),
        borderRadius: 10000,
    },

    name: {
        fontSize: normalTextSize * 1.25,
        textAlign: "center",
        fontWeight: "bold",
        color: darkBlue
    },

    bottom: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent',
        padding: normalTextSize,
        paddingBottom: normalTextSize / 2,
        paddingTop: normalTextSize / 2
    },

    gradient: {
        height:'60%'
    },

    procent: {
        height: "42.5%",
        justifyContent: "center",
    },

    procentText: {
        textAlign: "center",
        color: "white",
        fontSize: normalTextSize * 1.25
    },

    details: {
        height: "42.5%",
        justifyContent: "space-around",
        paddingRight: normalTextSize * 1.333
    },

    detail: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: normalTextSize
    },

    detailText: {
        color: "white",
        fontSize: normalTextSize * 1
    },

    opties: {
        height: "10%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-end"
    },

    reset: {
        marginTop: normalTextSize * .5,
        width: "33%",
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: "center"
    },

    input: {
        backgroundColor: lightPurple,
        fontSize: normalTextSize * 1.25,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        paddingLeft: normalTextSize,
        paddingRight: normalTextSize,
        borderColor: darkPuple,
        borderRadius: 10,
        borderWidth: normalTextSize * .15,
        marginLeft: normalTextSize,
        marginRight: normalTextSize,
    }
});