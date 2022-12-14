import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { normalTextSize } from './profiel/styleProfiel';

const Options = () => {
  const [diff, setDiff] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const loadData = async () => {
    let storedTime: string | null = await AsyncStorage.getItem("timer");
    let storedDiff: string | null = await AsyncStorage.getItem("difficulty");

    if (storedTime == null || storedDiff == null) {
      setDataLoaded(true);
    } else {
      setTimer(parseInt(storedTime))
      DifficultySetter(storedDiff);
      setDataLoaded(true);
    }
  }

  if (!dataLoaded) loadData();

  const DifficultySetter = async (a: string) => {
    setDiff(a);
    await AsyncStorage.setItem("difficulty", a)
  }

  const changeTimer = async (a: number) => {
    setTimer(a);
    await AsyncStorage.setItem("timer", a.toString())
  }

  const ResetStorage = async () => {
    await AsyncStorage.removeItem("difficulty");
    await AsyncStorage.removeItem("timer");
    await changeTimer(10);
    await DifficultySetter("easy");
  }

  return <View style={styles.buttoncontainer}>
    <View style={styles.options}>
      <Text style={styles.textstylesub}>Time limit</Text>
      <View>
        <Button
          mode={timer == 10 ? "contained" : "text"}
          onPress={() => changeTimer(10)}
          color="yellow">10 Seconds</Button>
        <Button
          mode={timer == 20 ? "contained" : "text"}
          onPress={() => changeTimer(20)}
          color="yellow">20 Seconds</Button>
        <Button
          mode={timer == 30 ? "contained" : "text"}
          onPress={() => changeTimer(30)}
          color="yellow">30 Seconds</Button>
      </View>
    </View>
  <View style={styles.options}>
    <Text style={styles.textstylesub}>Difficulty</Text>
    <View>
      <Button
        mode={diff == "easy" ? "contained" : "text"}
        onPress={() => DifficultySetter("easy")}
        color="yellow">Easy</Button>
      <Button
        mode={diff == "normal" ? "contained" : "text"}
        onPress={() => DifficultySetter("normal")}
        color="yellow">Normal</Button>
      <Button
        mode={diff == "hard" ? "contained" : "text"}
        onPress={() => DifficultySetter("hard")}
        color="yellow">Hard</Button>
    </View>
    </View>
    <View>
      <Button
        mode='contained'
        onPress={() => ResetStorage()}
        color='yellow'
      >Reset Settings
      </Button>
    </View>
  </View>
}

export default function Settings() {
  return (
    <LinearGradient colors={["#ff0000", "#ff9500"]}>
      <View style={{ backgroundColor: "white", height: 50 }}></View>
      <View style={styles.gradient}>
        <View style={styles.titleview}>
          <Text style={styles.textstylemain}>Settings</Text>
        </View>
        <Options />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,0,0)",
    backgroundGradient: "vertical",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },

  buttoncontainer: {
    alignItems: 'center',
  },

  options: {
    paddingBottom:20
  },

  gradient: {
    height: "100%"
  },

  textstylesub: {
    fontSize: normalTextSize * 1.5,
  },

  titleview: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:20
  },

  textstylemain: {
    fontSize: normalTextSize * 2,
  }
});