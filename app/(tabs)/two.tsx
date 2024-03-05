import { Alert, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { supabase, base } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { fetchHouseInfo } from "@/services/house";
import { useAppSelector } from "@/store/hooks";
export default function TabTwoScreen() {
  const [builded, setBuilded] = useState();
  const [address, setAddress] = useState("");
  const [availible, setAvailible] = useState("");
  const [rentFrom, setRentFrom] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number>();
  const [landlord, setLandlord] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  // const [session, setSession] = useState<Session | null>(null);
  const [landlordId, setLandlordId] = useState("");
  const session = useAppSelector((store) => store.session.session);
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);
  useEffect(() => {
    if (session) {
      getHouse();
    }
  }, [session]);
  async function getHouse() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      const { data, error, status } = await fetchHouseInfo(session);
      if (error && status !== 406) {
        throw error;
      }
      // console.log(data);

      if (data) {
        setLandlordId(data.landlord_id);
        setBuilded(data.builded_at.toString());
        setAddress(data.address);
        setAvailible(data.available_from);
        setRentFrom(data.profiles.rent_from);
        setMonthlyPayment(data.monthly_payment);
        setLandlord(data.landlord.full_name);
        setNumber(data.landlord.phone.toString());
        setEmail(data.landlord.mail);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.aboutHome}>
        <Text style={styles.aboutTitle}>О квартире и доме:</Text>
        <Text style={styles.title}>
          Год постройки: <Text style={styles.defaultText}>{builded}</Text>
        </Text>
        <Text style={styles.title}>
          Ремонт: <Text style={styles.defaultText}>Евроремонт</Text>
        </Text>
        <Text style={styles.title}>
          Адрес: <Text style={styles.defaultText}>{address}</Text>
        </Text>

        <Text style={styles.title}>
          Сдается с : <Text style={styles.defaultText}>{availible}</Text>
        </Text>
        <Text style={styles.title}>
          Снимает с : <Text style={styles.defaultText}>{rentFrom}</Text>
        </Text>
        <Text style={styles.title}>
          Месячная плата :{" "}
          <Text style={styles.defaultText}>{monthlyPayment}</Text>
        </Text>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.aboutTitle}>Об Арендодателе:</Text>
      <Text style={styles.title}>
        ФИО: <Text style={styles.defaultText}>{landlord}</Text>
      </Text>

      <Text style={styles.title}>
        Телефон: <Text style={styles.defaultText}>+7 {number}</Text>
      </Text>
      <Text style={styles.title}>
        Почта: <Text style={styles.defaultText}>{email}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  aboutTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 50,
    height: 1,
    width: "80%",
  },
  defaultText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "normal",
  },
  aboutHome: {
    marginBottom: 0,
  },
});
