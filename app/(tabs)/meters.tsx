import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import MeterCard from "@/components/MeterCard";
import MeterContainer from "@/components/MeterContainer";
import MyCarousel from "@/components/MeterContainer";
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <MyCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
