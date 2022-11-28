import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet,Text} from "react-native";
import Constants from "expo-constants";

import {ProfielenNavigation} from "./profiel/profielNavigation"

interface Profiel {
  id: number,
  name: string,
  wrong: number,
  correct: number
}

export const profielen: Profiel[] = [
  {
    id: 0,
    name: "Joris en de draak",
    wrong: 10,
    correct: 5
  },
  {
    id: 1,
    name: "Kondaa",
    wrong: 5,
    correct: 10
  },
  {
    id: 2,
    name: "The ride to hapiness by tomorrowland",
    wrong: 50,
    correct: 100
  }
  ,
  {
    id: 3,
    name: "Revolution",
    wrong: 0,
    correct: 0
  },
  {
    id: 4,
    name: "Falcon",
    wrong: 10,
    correct: 5
  },
  {
    id: 5,
    name: "De smurfer",
    wrong: 0 ,
    correct: 5
  },
]


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
