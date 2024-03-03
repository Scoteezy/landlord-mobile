// import { StyleSheet, Image, Alert,  } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, Alert, Pressable, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import Avatar from "../../components/Avatar";
import Account from "@/components/Account";
interface Profile {
  username: string;
  website: string;
  avatar_url: string;
  mobile_number: number;
}
export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [rentFrom, setRentFrom] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    if (session) getProfile();
  }, [session]);
  useEffect(() => {
    if (session) getProfile();
  }, [session]);
  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username, avatar_url,mobile_number,gender,address,age,full_name,rent_from`
        )
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setPhone(data.mobile_number);
        setAge(data.age);
        setGender(data.gender);
        setAddress(data.address);
        setFullName(data.full_name);
        setRentFrom(data.rent_from);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile({ avatar_url }: { avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
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
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          setAvatarUrl(url);
          updateProfile({ avatar_url: url });
        }}
      />

      <Text style={styles.title}>
        Имя пользвателя: <Text style={styles.defaultText}>{username}</Text>
      </Text>

      <Text style={styles.title}>
        ФИ: <Text style={styles.defaultText}>{fullName}</Text>
      </Text>
      <Text style={styles.title}>
        Возраст: <Text style={styles.defaultText}>{age}</Text>
      </Text>
      <Text style={styles.title}>
        Пол: <Text style={styles.defaultText}>{gender}</Text>
      </Text>
      <Text style={styles.title}>
        Адрес: <Text style={styles.defaultText}>{address}</Text>
      </Text>
      <Text style={styles.title}>
        Телефон: <Text style={styles.defaultText}>{phone}</Text>
      </Text>

      <Text style={styles.title}>
        Снимает с : <Text style={styles.defaultText}>{rentFrom || ""}</Text>
      </Text>
      <Link href="/changeModal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Изменить</Text>
        </Pressable>
      </Link>

      <Pressable
        style={styles.signoutButton}
        onPress={() => supabase.auth.signOut()}
      >
        <Text style={styles.text}>Выйти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  defaultText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "normal",
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
  signoutButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
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
