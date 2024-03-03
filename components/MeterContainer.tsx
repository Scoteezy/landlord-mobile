import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { useColorScheme } from "@/components/useColorScheme";
import MeterCard from "./MeterCard";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
const MeterContainer = () => {
  const data = [
    {
      date: "Февраль 2024",
      rent: {
        price: 20000,
        isPayed: true,
      },
      water: {
        meters: 6666666,
        price: 55555,
        isPayed: false,
      },
      elec: {
        meters: 666664,
        price: 3000,
        isPayed: true,
      },
      ethernet: {
        price: 700,
        isPayed: true,
      },
    },
    {
      date: "Январь 2023",
      rent: {
        price: 20000,
        isPayed: true,
      },
      water: {
        meters: 44444444,
        price: 3333,
        isPayed: true,
      },
      elec: {
        meters: 33333,
        price: 2222,
        isPayed: true,
      },
      ethernet: {
        price: 700,
        isPayed: true,
      },
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {data.map((item) => (
        <MeterCard key={item.date} {...item} />
      ))}
    </ScrollView>
  );
};

export default MeterContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
