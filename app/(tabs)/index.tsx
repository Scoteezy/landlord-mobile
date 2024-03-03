import { StyleSheet, Image, Alert, Pressable } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
export default function TabOneScreen() {
  let gender = "Мужской";
  return (
    <View style={styles.container}>
      {gender.toLowerCase() === "мужской" ? (
        <Image
          source={{
            uri: "https://www.belizeplanners.org/wp-content/uploads/2016/01/male-placeholder.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginBottom: 50,
          }}
        />
      ) : (
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginBottom: 50,
          }}
        />
      )}

      <Text style={styles.title}>
        Имя: <Text style={styles.defaultText}>Денис</Text>
      </Text>

      <Text style={styles.title}>
        Фамилия: <Text style={styles.defaultText}>Бондаренко</Text>
      </Text>
      <Text style={styles.title}>
        Возраст: <Text style={styles.defaultText}>20</Text>
      </Text>
      <Text style={styles.title}>
        Пол: <Text style={styles.defaultText}>{gender}</Text>
      </Text>
      <Text style={styles.title}>
        Адрес:{" "}
        <Text style={styles.defaultText}>
          г. Ростов-на-Дону, ул. Пешкова 55
        </Text>
      </Text>
      <Text style={styles.title}>
        Телефон: <Text style={styles.defaultText}>+79198768851</Text>
      </Text>

      <Text style={styles.title}>
        Снимает с : <Text style={styles.defaultText}>06.07.2023</Text>
      </Text>
      <Link href="/changeModal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Изменить</Text>
        </Pressable>
      </Link>

      <Pressable
        style={styles.signoutButton}
        onPress={() => Alert.alert("Simple Button pressed")}
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
