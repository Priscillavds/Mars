import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import BVLinearGradient from 'react-native-linear-gradient';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timer = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [timer, setTimer] = useState<number>(10);
  const loadData = async () => {
    let time = await AsyncStorage.getItem("timer");
    if (time == null) {
      setDataLoaded(true);
    }
    else {
      setTimer(parseInt(time))
      setDataLoaded(true);
    }
  }
  if (!dataLoaded) loadData();
  const changeTimer = async(a: number) => {
    setTimer(a);
    await AsyncStorage.setItem("timer",a.toString())
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

  </View>


}


const Difficulty = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [diff, setDiff] = useState("easy");
  const [diffRange, setDiffRange] = useState(0);
  const [diffOffset, setDiffOffset] = useState(0);
  const loadData = async () => {
    let storedDiff = await AsyncStorage.getItem("difficulty");
    if (storedDiff == null) {
      setDataLoaded(true);
    }
    else {
      DifficultySetter(storedDiff)
      setDataLoaded(true);
    }
  }
  if (!dataLoaded) loadData();
  const DifficultySetter = async(a: string) => {
    switch (a) {
      case "easy":
        setDiff(a);
        await AsyncStorage.setItem("difficulty",a)
        setDiffRange(300);
        setDiffOffset(100);
        break;
      case "normal":
        setDiff(a);
        await AsyncStorage.setItem("difficulty",a)
        setDiffRange(700);
        setDiffOffset(400);
        break;
      case "hard":
        setDiff(a);
        await AsyncStorage.setItem("difficulty",a)
        setDiffRange(800);
        setDiffOffset(1000);
        break;
    }
  }

  return <View style={styles.buttoncontainer}>
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
        <Difficulty />
        <Text></Text>
        <Timer />
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