// import { StyleSheet, Image, Alert,  } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, Alert, Pressable, Image } from "react-native";
import { Session } from "@supabase/supabase-js";
import Avatar from "../../components/Avatar";
import { fetchUserInfo } from "@/services/user";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchUser, updateUser } from "@/store/userSlice";
interface Profile {
  username: string;
  website: string;
  avatar_url: string;
  mobile_number: number;
}
export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [rentFrom, setRentFrom] = useState("");
  const session = useAppSelector((store) => store.session.session);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session) getProfile();
  }, [session]);
  useEffect(() => {
    setUsername(user.username);
    setAvatarUrl(user.avatar_url);
    setPhone(user.mobile_number.toString());
    setAge(user.age.toString());
    setGender(user.gender);
    setAddress(user.address);
    setFullName(user.full_name);
    setRentFrom(user.rent_from);
  }, [user]);
  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      await dispatch(fetchUser(session));
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

      // const { error } = await supabase.from("profiles").upsert(updates);
      dispatch(updateUser({ updates, id: session.user.id }));
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
          <Text style={styles.text}>
            {loading ? "Подождите.." : "Изменить"}
          </Text>
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
