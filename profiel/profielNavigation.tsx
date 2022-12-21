import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/*import {
    SharedElement,
    createSharedElementStackNavigator,
  } from 'react-navigation-shared-element';*/
import { ProfielPage } from "./profielPage/profielPage"
import { Profielen } from "./profielen/profielen"

interface Profiel {
    id: number,
    name: string,
    wrong: number,
    correct: number
}

const Stack = createNativeStackNavigator();

export const ProfielenNavigation = ({route }: { route:any }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profielen" component={Profielen } initialParams={route.params} />
            <Stack.Screen name="Profiel" component={ProfielPage} />
        </Stack.Navigator>
    )
}
