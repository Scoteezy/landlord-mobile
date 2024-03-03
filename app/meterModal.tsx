import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import { useGetPokemonByNameQuery } from "@/services/meter";

export default function ModalScreen() {
  const [name, setName] = useState("Denis");
  const [surname, setSurname] = useState("Bondarenko");
  const [age, setAge] = useState("20");
  // const isPresented = router.canGoBack();
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  return (
    <View>
      <View style={styles.inputContainer}>
        <View>
          {error ? (
            <Text>Oh no, there was an error</Text>
          ) : isLoading ? (
            <Text>Loading...</Text>
          ) : data ? (
            <>
              <Text>{data.species.name}</Text>
              <Image
                source={{ uri: data.sprites.front_shiny }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  marginBottom: 50,
                }}
              />
            </>
          ) : null}
        </View>
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
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
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
