import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { GetUserID, Login } from "../apiClient/interface";
import { useProfessor } from "./userContext";
export default function LogIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setProfessorId } = useProfessor();

  const handleLogin = async () => {
    const result = await Login(username, password);
    if (result.success) {
      const response = await GetUserID(username);
      const userId = response.data.id;

      setProfessorId(userId);
      router.push("/mainPage");
    } else {
      alert("Error al iniciar sesión a: " + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
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
  container: {
    flex: 1,
    backgroundColor: "#015428",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#015428",
    fontSize: 16,
    fontWeight: "bold",
  },
});
