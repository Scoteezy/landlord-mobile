import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
export default function ModalScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [rentFrom, setRentFrom] = useState(new Date(1598051730000));
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setRentFrom(currentDate);
  };
  const onSubmit = async () => {
    await updateProfile({
      username,
      full_name: fullName,
      gender,
      address,
      rent_from: rentFrom,
      mobile_number: +phone,
      age: +age,
    });
    router.back();
  };

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
        .select(`username,mobile_number,gender,address,age,full_name,rent_from`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setPhone(data.mobile_number.toString());
        setAge(data.age.toString());
        setGender(data.gender);
        setAddress(data.address);
        setFullName(data.full_name);
        setRentFrom(data.rent_from || new Date(1598051730000));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile({
    username,
    full_name,
    gender,
    address,
    rent_from,
    mobile_number,
    age,
  }: {
    username: string;
    full_name: string;
    gender: string;
    address: string;
    rent_from: Date;
    mobile_number: number;
    age: number;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        age,
        gender,
        address,
        rent_from,
        mobile_number: mobile_number,
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
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Логин</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          maxLength={20}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>ФИ</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFullName}
          value={fullName}
          maxLength={20}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Пол</Text>
        <RNPickerSelect
          value={gender}
          onValueChange={(value) => setGender(value)}
          placeholder={{
            label: "Выберите пол",
            value: null,
            color: "#9EA0A4",
          }}
          style={{
            iconContainer: {
              top: 20,
              right: 10,
            },

            inputIOS: {
              fontSize: 12,
              fontWeight: "bold",
              backgroundColor: "#181513",
              height: 40,
              width: 200,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              color: "white",
              borderColor: "#fff",
              borderRadius: 6,
            },
          }}
          items={[
            { label: "Мужской", value: "мужской" },
            { label: "Женский", value: "женский" },
            { label: "Другое..", value: "другое" },
          ]}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Возраст</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          inputMode="numeric"
          maxLength={2}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Адрес</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          maxLength={50}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Телефон</Text>
        <Text style={styles.number}>8</Text>
        <TextInput
          style={(styles.input, styles.numberInput)}
          onChangeText={setPhone}
          value={phone}
          inputMode="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Снимаю с</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(rentFrom)}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            style={{ marginLeft: 10 }}
            timeZoneName={"Europe/Russia"}
          />
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {
        <>
          <Pressable style={styles.acceptButton} onPress={onSubmit}>
            <Text style={styles.text}>
              {" "}
              {loading ? "Загрузка ..." : "Применить"}
            </Text>
          </Pressable>
          <Link href="../" asChild>
            <Pressable style={styles.discardButton}>
              <Text style={styles.text}>Отменить</Text>
            </Pressable>
          </Link>
        </>
      }
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  number: {
    fontWeight: "bold",
    position: "absolute",
    left: 110,
    zIndex: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  helpLink: {
    paddingVertical: 15,
    marginTop: 20,
  },
  helpLinkText: {
    textAlign: "center",
    color: "lightblue",
  },
  defaultText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "normal",
  },
  numberInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "#fff",
    borderRadius: 6,
    backgroundColor: "#181513",
    paddingHorizontal: 25,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "#fff",
    borderRadius: 6,
    backgroundColor: "#181513",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  datePickerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
  },
  discardButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    marginBottom: 15,
  },
  acceptButton: {
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
