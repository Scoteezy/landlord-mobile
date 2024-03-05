import { useEffect } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { Meter } from "@/types/Meter";

interface CardProps {
  date: string; // тип для даты можно использовать строку
  rent: {
    price: number; // цена аренды - число (предположительно в рублях)
    isPayed: boolean; // флаг, оплачена ли аренда
  };
  water: {
    meters: number; // показания счетчика воды
    price: number;
    isPayed: boolean; // флаг, оплачены ли счета за воду
  };
  electricity: {
    meters: number; // показания счетчика электроэнергии
    price: number; // цена за электроэнергию
    isPayed: boolean; // флаг, оплачены ли счета за электроэнергию
  };
  ethernet: {
    price: number; // цена за интернет
    isPayed: boolean; // флаг, оплачен ли интернет
  };
}

const MeterCard = ({ date, rent, water, electricity, ethernet }: Meter) => {
  const colorScheme = useColorScheme();
  console.log(rent.isPayed);
  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{date}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Аренда:</Text>
        <Text style={styles.defaultText}>Цена: {rent.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {rent.isPayed ? (
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
          Показания счетчиков: {electricity.meters}
        </Text>
        <Text style={styles.defaultText}>Цена: {electricity.price} Руб.</Text>
        <Text style={styles.defaultText}>
          Оплачено:{" "}
          {electricity.isPayed ? (
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
      <Link href="/meterModal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Редактировать</Text>
        </Pressable>
      </Link>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
