import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import BVLinearGradient from 'react-native-linear-gradient';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageProps {
  siff?: string,
  setDiff?: (difficulty: string) => void,
  difficultyoffset?: string,
  difficultyrange?: string,
  timer?: string
  setTimer?: (timer: string) => void
}

const Options = () => {
  const [diff, setDiff] = useState<string>("easy");
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);

  const loadData = async () => {
    let time: any = await AsyncStorage.getItem("timer");
    let storedDiff: any = await AsyncStorage.getItem("difficulty");
    if (time == null) {
      setDataLoaded(true);
    }

    else {
      setTimer(parseInt(time))
      DifficultySetter(storedDiff);
      setDataLoaded(true);
    }
  }

  if (!dataLoaded) loadData();
  
  const DifficultySetter = async (a: string) => {
    switch (a) {

      case "easy":
        setDiff(a);
        await AsyncStorage.setItem("difficulty", a)
        await AsyncStorage.setItem("difficultyrange", "300")
        await AsyncStorage.setItem("difficultyoffset", "100")
        break;

      case "normal":
        setDiff(a);
        await AsyncStorage.setItem("difficulty", a)
        await AsyncStorage.setItem("difficultyrange", "700")
        await AsyncStorage.setItem("difficultyoffset", "400")
        break;

      case "hard":
        setDiff(a);
        await AsyncStorage.setItem("difficulty", a)
        await AsyncStorage.setItem("difficultyrange", "1000")
        await AsyncStorage.setItem("difficultyoffset", "800");
        break;
    }


  }

  const changeTimer = async (a: number) => {
    setTimer(a);
    await AsyncStorage.setItem("timer", a.toString())
  }

  const ResetStorage = async () => {
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