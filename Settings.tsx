import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import BVLinearGradient from 'react-native-linear-gradient';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

let buttonContained:any = "uncontained"
let buttonUnContained:any = "contained"

const Timer = () => {
  const [timer, setTimer] = useState(10);
  const changeTimer = (a: number) => {
    setTimer(a);
  }
  return <View style={styles.buttoncontainer}>
    <Button
    mode={timer==10?"contained":"text"}
      onPress={() => changeTimer(10)}
      color="white">10 Seconds</Button>
    <Button
    mode={timer==20?"contained":"text"}
      onPress={() => changeTimer(20)}
      color="white">20 Seconds</Button>
    <Button
    mode={timer==30?"contained":"text"}
      onPress={() => changeTimer(30)}
      color="white">30 Seconds</Button>
  </View>
  

}

const Difficulty = () => {
  const [diff, setDiff] = useState("easy");
  const [diffRange, setDiffRange] = useState(0);
  const [diffOffset, setDiffOffset] = useState(0);
  const DifficultySetter = (a: string) => {
    switch (a) {
      case "easy":
        setDiff(a);
        setDiffRange(300);
        setDiffOffset(100);
        break;
      case "normal":
        setDiff(a);
        setDiffRange(700);
        setDiffOffset(400);
        break;
      case "hard":
        setDiff(a);
        setDiffRange(800);
        setDiffOffset(1000);
        break;
    }
  }

  return <View style={styles.buttoncontainer}>
    <Text style={styles.textstyle}>Difficulty</Text>
    <View>
      <Button
      mode={diff=="easy"?"contained":"text"}
        onPress={() => DifficultySetter("easy")}
        color="white">Easy</Button>
      <Button
      mode={diff=="normal"?"contained":"text"}
        onPress={() => DifficultySetter("normal")}
        color="white">Normal</Button>
      <Button
      mode={diff=="hard"?"contained":"text"}
        onPress={() => DifficultySetter("hard")}
        color="white">Hard</Button>
    </View>
  </View>
}
export default function Settings() {
  return (
    <LinearGradient colors={["#ff0000", "#ff9500"]}>
      <View style={{ backgroundColor: "white", height: 50 }}></View>
      <View style={styles.gradient}>
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
    backgroundColor: "transparant",
    justifyContent:'center',
    alignItems:'center',
    fontSize:"10rem"
  },
  gradient: {
    height: 720
  },
  textstyle:{
    fontSize:30
  }
});