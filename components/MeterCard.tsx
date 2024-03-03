import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { useColorScheme } from "@/components/useColorScheme";

interface CardProps {
  date: string; // тип для даты можно использовать строку
  rent: {
    price: number; // цена аренды - число (предположительно в рублях)
    isPayed: boolean; // флаг, оплачена ли аренда
  };
  water: {
    meters: number; // показания счетчика воды
    price: number; // цена за воду
    isPayed: boolean; // флаг, оплачены ли счета за воду
  };
  elec: {
    meters: number; // показания счетчика электроэнергии
    price: number; // цена за электроэнергию
    isPayed: boolean; // флаг, оплачены ли счета за электроэнергию
  };
  ethernet: {
    price: number; // цена за интернет
    isPayed: boolean; // флаг, оплачен ли интернет
  };
}

const MeterCard = ({ date, rent, water, elec, ethernet }: CardProps) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{date}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Аренда:</Text>
        <Text style={styles.defaultText}>Цена: {rent.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {water.isPayed ? (
            <FontAwesome
              name="check-circle-o"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          ) : (
            <FontAwesome
              name="ban"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          )}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Вода:</Text>
        <Text style={styles.defaultText}>
          Показания счетчиков: {water.meters}
        </Text>
        <Text style={styles.defaultText}>Цена: {water.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {water.isPayed ? (
            <FontAwesome
              name="check-circle-o"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          ) : (
            <FontAwesome
              name="ban"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          )}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Электричество:</Text>
        <Text style={styles.defaultText}>
          Показания счетчиков: {elec.meters}
        </Text>
        <Text style={styles.defaultText}>Цена: {elec.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {elec.isPayed ? (
            <FontAwesome
              name="check-circle-o"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          ) : (
            <FontAwesome
              name="ban"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          )}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Интернет:</Text>
        <Text style={styles.defaultText}>Стоимость: {ethernet.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {ethernet.isPayed ? (
            <FontAwesome
              name="check-circle-o"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          ) : (
            <FontAwesome
              name="ban"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15 }}
            />
          )}
        </Text>
      </View>
    </View>
  );
};

export default MeterCard;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginTop: 50,
  },
  infoContainer: {
    backgroundColor: "#181513",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  defaultText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "normal",
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
