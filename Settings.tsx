import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

const TimeLimit = () => {
  return <View>
  </View>
}

const Difficulty = () => {
  const [diff,setDiff] = useState("")
  const [diffRange,setDiffRange] = useState(0);
  const [diffOffset,setDiffOffset] = useState(0);
  switch (diff){
    case "easy":
      setDiffRange(300);
      setDiffOffset(100);
      break;
    case "normal":
      setDiffRange(700);
      setDiffOffset(400);
      break;
    case "hard":
      setDiffRange(800);
      setDiffOffset(1000);
      break;
  }
}
export default function Settings() {
    return (
      <View style={styles.container}>
        <Text>H</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });