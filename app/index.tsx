import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import LogIn from "./logIn";

export const options = {
  headerShown: false,
};

export default function Index() {
  const [showLogin, setShowLogin] = useState(false); //default

  if (showLogin) {
    return <LogIn />;
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          color: "#fff",
        }}
      >
        Grow Emoji
      </Text>
      <Pressable style={styles.button} onPress={() => setShowLogin(true)}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Click para iniciar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#015428",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 30,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#015428",
  },
});
