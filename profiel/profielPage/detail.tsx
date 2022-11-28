import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import Constants from "expo-constants";

import { normalTextSize } from '../styleProfiel';

export const Detail = ({ title, info }: { title: string, info: string }) => {
    return (
      <View style={styles.detail}>
        <Text style={[styles.detailText, { fontWeight: "bold" }]}>{title}</Text>
        <Text style={styles.detailText}>{info}</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
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

});