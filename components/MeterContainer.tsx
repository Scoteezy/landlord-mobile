import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MeterCard from "./MeterCard";
import { ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeters } from "@/store/meterSlice";
import { Text } from "./Themed";
const MeterContainer = () => {
  const session = useAppSelector((store) => store.session.session);
  const meters = useAppSelector((store) => store.meters.meters);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session) getMeters();
  }, [session]);
  async function getMeters() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      await dispatch(fetchMeters(session));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
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
      {loading ? (
        <Text style={styles.title}>"Загрузка..."</Text>
      ) : (
        meters.map((item) => <MeterCard key={item.date} {...item} />)
      )}
    </ScrollView>
  );
};

export default MeterContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
