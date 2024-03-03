import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.aboutHome}>
        <Text style={styles.aboutTitle}>О квартире и доме:</Text>
        <Text style={styles.title}>
          Год постройки: <Text style={styles.defaultText}>2022</Text>
        </Text>
        <Text style={styles.title}>
          Ремонт: <Text style={styles.defaultText}>Евроремонт</Text>
        </Text>
        <Text style={styles.title}>
          Адрес:{" "}
          <Text style={styles.defaultText}>
            г. Ростов-на-Дону, ул. Пешкова 55
          </Text>
        </Text>
        <Text style={styles.title}>
          Подъзед: <Text style={styles.defaultText}>1</Text>
        </Text>
        <Text style={styles.title}>
          Квартира: <Text style={styles.defaultText}>22</Text>
        </Text>
        <Text style={styles.title}>
          Сдается с : <Text style={styles.defaultText}>02.06.2021</Text>
        </Text>
        <Text style={styles.title}>
          Квартиросъемщик :{" "}
          <Text style={styles.defaultText}>Бондаренко Д. О.</Text>
        </Text>
        <Text style={styles.title}>
          Снимает с : <Text style={styles.defaultText}>06.07.2023</Text>
        </Text>
        <Text style={styles.title}>
          Месячная плата : <Text style={styles.defaultText}>20000</Text>
        </Text>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.aboutTitle}>Об Арендодателе:</Text>
      <Text style={styles.title}>
        ФИО: <Text style={styles.defaultText}>Тюрин Леонид Игоревич</Text>
      </Text>

      <Text style={styles.title}>
        Телефон: <Text style={styles.defaultText}>+79198767761</Text>
      </Text>
      <Text style={styles.title}>
        Почта: <Text style={styles.defaultText}>arenda@gmail.com</Text>
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
