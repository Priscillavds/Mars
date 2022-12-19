import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Options = () => {
  const [diff, setDiff] = useState<string>("easy");
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);

  const loadData = async () => {
    let time: any = await AsyncStorage.getItem("timer");
    let storedDiff: any = await AsyncStorage.getItem("difficulty");

    if (time == null) {
      setDataLoaded(true);
    } else {
      setTimer(parseInt(time))
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
    await AsyncStorage.clear();
    changeTimer(10);
    DifficultySetter("easy");
  }

  return <View style={styles.buttoncontainer}>
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
    <Text></Text>
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
        <Text></Text>
        <Options />
        <Text></Text>
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
  },
  buttoncontainer: {
    borderColor: 'black',
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: "10rem",
  },
  gradient: {
    height: 720
  },
  textstylesub: {
    fontSize: 30,
  },
  titleview: {
    alignItems: "center",
    justifyContent: "center"
  },
  textstylemain: {
    fontSize: 40,
  }
});