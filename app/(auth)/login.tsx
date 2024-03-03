import Auth from "@/components/Auth";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
