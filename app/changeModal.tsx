import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";

export default function ModalScreen() {
  const [name, setName] = useState("Denis");
  const [surname, setSurname] = useState("Bondarenko");
  const [age, setAge] = useState("20");
  // const isPresented = router.canGoBack();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Имя</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          maxLength={20}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Фамилия</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSurname}
          value={surname}
          maxLength={20}
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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {
        <>
          <Link href="../" asChild>
            <Pressable style={styles.acceptButton}>
              <Text style={styles.text}>Применить</Text>
            </Pressable>
          </Link>
          <Link href="../" asChild>
            <Pressable style={styles.discardButton}>
              <Text style={styles.text}>Отменить</Text>
            </Pressable>
          </Link>
        </>
      }
      {/* <Link href="../" asChild>
        <Pressable style={styles.acceptButton}>
          <Text style={styles.text}>Применить</Text>
        </Pressable>
      </Link>
      <Pressable
        style={styles.acceptButton}
        onPress={() => Alert.alert("Simple Button pressed")}
      >
        <Text style={styles.text}>Применить</Text>
      </Pressable>
      <Pressable
        style={styles.discardButton}
        onPress={() => Alert.alert("Simple Button pressed")}
      >
        <Text style={styles.text}>Отменить</Text>
      </Pressable> */}
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "#fff",
    borderRadius: 6,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
