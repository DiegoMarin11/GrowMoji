import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { AddPlantType } from "../../../apiClient/interface";
import { useRouter } from "expo-router";

export default function AddPlantTypeScreen() {
  const [name, setName] = useState("");
  const [optimalHumidity, setOptimalHumidity] = useState("");
  const [optimalNitrogen, setOptimalNitrogen] = useState("");
  const [optimalPhosphorus, setOptimalPhosphorus] = useState("");
  const [optimalPotassium, setOptimalPotassium] = useState("");
  const [optimalSunlight, setOptimalSunlight] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      name,
      optimalHumidity: parseFloat(optimalHumidity),
      optimalNitrogen: parseFloat(optimalNitrogen),
      optimalPhosphorus: parseFloat(optimalPhosphorus),
      optimalPotassium: parseFloat(optimalPotassium),
      optimalSunlight: parseFloat(optimalSunlight),
      estimatedTime: parseInt(estimatedTime),
    };

    const result = await AddPlantType(data);

    if (result.success) {
      Alert.alert("Éxito", "Tipo de planta agregado correctamente");
      router.back();
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Tipo de Planta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Humedad Óptima"
        keyboardType="numeric"
        value={optimalHumidity}
        onChangeText={setOptimalHumidity}
      />
      <TextInput
        style={styles.input}
        placeholder="Nitrógeno Óptimo"
        keyboardType="numeric"
        value={optimalNitrogen}
        onChangeText={setOptimalNitrogen}
      />
      <TextInput
        style={styles.input}
        placeholder="Fósforo Óptimo"
        keyboardType="numeric"
        value={optimalPhosphorus}
        onChangeText={setOptimalPhosphorus}
      />
      <TextInput
        style={styles.input}
        placeholder="Potasio Óptimo"
        keyboardType="numeric"
        value={optimalPotassium}
        onChangeText={setOptimalPotassium}
      />
      <TextInput
        style={styles.input}
        placeholder="Luz Solar Óptima"
        keyboardType="numeric"
        value={optimalSunlight}
        onChangeText={setOptimalSunlight}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiempo Estimado (en segundos)"
        keyboardType="numeric"
        value={estimatedTime}
        onChangeText={setEstimatedTime}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#015428",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
