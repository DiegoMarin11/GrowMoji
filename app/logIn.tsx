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
import { GetUserID, Login, getDeviceByUserId } from "../apiClient/interface";
import { useProfessor } from "./userContext";
export default function LogIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setProfessorId } = useProfessor();

  const handleLogin = async () => {
    const result = await Login(username, password);
    console.log("sdsads");
    if (result.success) {
      const response = await GetUserID(username);
      const userId = response.data.id;
      const role = response.data.role;

      if (role === "USER") {
        const deviceResult = await getDeviceByUserId(userId);

        if (deviceResult.success) {
          const devices = deviceResult.data;

          if (devices.length > 0) {
            const deviceId = devices[0].id;
            console.log("Dispositivo encontrado:", deviceId);

            router.push({
              pathname: "/crud/plants/plantDetailledView",
              params: { deviceId },
            });
          } else {
            Alert.alert(
              "Error",
              "No se encontró ningún dispositivo asociado al usuario.",
            );
          }
        } else {
          Alert.alert(
            "Error",
            "No se pudo obtener los dispositivos del usuario.",
          );
        }

        return;
      } else {
        // Si es profesor
        setProfessorId(userId);
        router.push("/mainPage");
      }
    } else {
      Alert.alert("Error al iniciar sesión", result.error);
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
      <Pressable
        style={[styles.button, styles.registerButton]}
        onPress={() => router.push("./crud/professor/registerProfessor")} // Aquí va la ruta a la pantalla de registro de profesor
      >
        <Text style={styles.buttonText}>Registrar Profesor</Text>
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
  registerButton: {
    marginTop: 20, // espacio adicional para separar los botones
  },
});
