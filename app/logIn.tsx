import { View, Text, StyleSheet } from "react-native";
export default function LogIn() {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Holas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center",
  },
  loginText: {
    fontSize: 20,
    color: "#fff",
  },
});
