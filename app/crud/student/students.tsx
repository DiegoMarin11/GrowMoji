import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { CreateStudent } from "../../../apiClient/interface";
import { useRouter } from "expo-router";

export default function Students() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !username || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const result = await CreateStudent({
      name,
      email,
      username,
      password,
      role: "USER"
    });

    if (result.success) {
      Alert.alert("Éxito", "Alumno creado correctamente.");
      router.back(); // Vuelve a la pantalla anterior
    } else {
      Alert.alert("Error", result.error || "No se pudo crear el alumno.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Alumno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Alumno</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#015428",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#015428",
    fontSize: 16,
    fontWeight: "bold",
  },
});
