import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";
import Colors from "@/constants/Colors";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Разработчик: Денис Бондаренко</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>
        Стек: <Text style={styles.defaultText}>React Native, TypeScript</Text>
      </Text>

      <ExternalLink style={styles.helpLink} href="https://github.com/Scoteezy">
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          Нажмите чтобы посмотреть github
        </Text>
      </ExternalLink>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
});
