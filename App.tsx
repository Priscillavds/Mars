
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert, Button, Image, LogBox } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Settings from './Settings';
import HomeScreen from './Homescreen';
import { ProfielenNavigation } from "./profiel/profielNavigation"
import { Quiz } from './quiz/quiz';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'equire cycle:'
]);

interface ProfielObject {
  profiels: Profiel[]
}

interface Profiel {
  id: number,
  name: string,
  wrong: number,
  correct: number,
  imgUri?: string
}

const profielen: ProfielObject = {
  profiels: [
    {
      id: 0,
      name: "New Player",
      wrong: 0,
      correct: 0
    },

  ]
};

const Tab = createBottomTabNavigator();

function App() {
  const [settingsLoaded, setSettingsLoaded] = useState<boolean>(false);
  const [player, setPlayer] = useState<number>(0);
  const [profiels, setProfiels] = useState<Profiel[]>([]);

  const LoadDataIntoAsyncStorage = async () => {
    let timer: string | null = await AsyncStorage.getItem("timer");
    let difficulty: string | null = await AsyncStorage.getItem("difficulty");
    let player: string | null = await AsyncStorage.getItem("player");
    let profiels: string | null = await AsyncStorage.getItem("profiels");
    if (timer == null || difficulty == null) {
      await AsyncStorage.setItem("timer", "10");
      await AsyncStorage.setItem("difficulty", "easy");
    }
    if (player == null) await AsyncStorage.setItem("player", "0");
    if (profiels == null) await AsyncStorage.setItem("profiels", JSON.stringify(profielen));
    setSettingsLoaded(true);
  }

  if (!settingsLoaded) LoadDataIntoAsyncStorage();

  const LoadPlayer = async () => {
    let loadPlayer: string | null = await AsyncStorage.getItem("player");

    if (loadPlayer != null) setPlayer(parseInt(loadPlayer));

  }

  LoadPlayer();

  useEffect(() => {
    const LoadProfiels = async () => {
      let loadProfiels: string | null = await AsyncStorage.getItem("profiels");

      if (loadProfiels != null) {
        let loadProfielsList = [...JSON.parse(loadProfiels).profiels]
        loadProfielsList.forEach((p: Profiel) => profiels.push(p));
        setProfiels([...profiels]);
      }
      // = [...JSON.parse(loadProfiels).profiels]
    }
    LoadProfiels();
  }, [])

  const getProfiel = (id: number): Profiel | null => {
    let result: Profiel | null = null;
    profiels.forEach((profiel: Profiel) => {
      if (profiel.id == id) {
        result = profiel;
      }
    })
    return result;
  }

  const getProfielIndex = (id: number): number | null => {
    let result: number | null = null;
    profiels.forEach((profiel: Profiel, index: number) => {
      if (profiel.id == id) {
        result = index;
      }
    })
    return result;
  }

  const updateProfiel = async (id: number, newProfiel: Profiel) => {

    let oldProfiel: Profiel | null = getProfiel(id);
    if (oldProfiel == null) { return }

    oldProfiel.correct = newProfiel.correct;
    oldProfiel.wrong = newProfiel.wrong;
    oldProfiel.name = newProfiel.name;
    oldProfiel.imgUri = newProfiel.imgUri;

    setProfiels([...profiels]);
    await AsyncStorage.setItem("profiels", JSON.stringify({ profiels: profiels }));
  }

  const deleteProfiel = async (id: number,check:boolean) => {

    let index: number | null = getProfielIndex(id);
    if (index == null || profiels.length <= 1) { return; }

    if (check) {
      profiels.splice(index, 1);   
      updatePlayer(profiels[0].id);
    }else {
      profiels.splice(index, 1);
    }

    
    setProfiels([...profiels]);
    await AsyncStorage.setItem("profiels", JSON.stringify({ profiels: profiels }));
  }

  const newProfiel = (newProfiel: Profiel) => {
    let newId: number = profiels[profiels.length - 1].id + 1;

    newProfiel.id = newId;
    profiels.push(newProfiel)

    setProfiels([...profiels]);
    updateProfiel(newProfiel.id, newProfiel)
    return newProfiel;
  }

  const updatePlayer = async (id: number) => {
    let index: number | null = getProfielIndex(id);
    if (index == null) { return; }

    await AsyncStorage.setItem("player", id.toString())
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "blue",
        }}

      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color, size }: any) => <FontAwesome name="home" size={size} color={color} />,
        }} />
        <Tab.Screen name="Quiz" component={Quiz}
          initialParams={{ profiels: profiels, newProfiel: newProfiel, updateProfiel: updateProfiel, getProfiel: getProfiel }}
          options={{
            tabBarIcon: ({ color, size }: any) => <FontAwesome name="home" size={size} color={color} />,
          }} />
        <Tab.Screen name="Profiels" component={ProfielenNavigation}
          initialParams={{ profiels: profiels, newProfiel: newProfiel, updateProfiel: updateProfiel, deleteProfiel: deleteProfiel, updatePlayer: updatePlayer }}
          options={{
            tabBarIcon: ({ color, size }: any) => <FontAwesome name="home" size={size} color={color}
            />,
          }} />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ color, size }: any) => <MaterialIcons name="settings" size={size} color={color} />
        }} />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

/*
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      

      <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat scelerisque varius morbi. Faucibus turpis in eu mi bibendum neque. Tristique nulla aliquet enim tortor at. Neque ornare aenean euismod elementum nisi quis eleifend. Cursus vitae congue mauris rhoncus aenean vel. Quis eleifend quam adipiscing vitae. Felis imperdiet proin fermentum leo vel orci porta. Neque laoreet suspendisse interdum consectetur libero id faucibus. Nec nam aliquam sem et. Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget.</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      
      <Pressable
                style={styles.pressable}
                onPress={() => {
                    Alert.alert("Pressed!");
                }}
            >
                <Text style={styles.buttontext}>Quiz</Text>
      </Pressable>
      
    </View>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb7b2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15

  },
  pressable: {
    backgroundColor: '#ff4032'
  },
  text: {
    color: '#AD2B2B'
  },
  buttontext: {
    color: 'white'
  },
  title: {
    fontSize: 32,
    color: '#ff1100'
  },
  image: {
    width: 95,
  }
});


export default App;