import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { createSensor } from "../../../apiClient/interface";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
export default function SensorForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("TEMPERATURE");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const handleSubmit = async () => {
    try {
      const sensorData = {
        name,
        type,
        description,
        manufacturer,
      };

      const result = await createSensor(sensorData);
      if (result.success) {
        alert("Sensor creado correctamente");
        router.back();
      } else {
        alert("Hubo un error al agregar el sensor");
      }
    } catch (error) {
      console.error(
        "Error creando sensor:",
        error.response?.data || error.message,
      );
      alert("Hubo un error al agregar el sensor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre del Sensor</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Sensor de temperatura 1"
      />

      <Text style={styles.label}>Tipo de Sensor</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="TEMPERATURE" value="TEMPERATURE" />
        <Picker.Item label="HUMIDITY" value="HUMIDITY" />
        <Picker.Item label="PH" value="PH" />
        {/* Agrega más tipos si necesitas */}
      </Picker>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Ej: Mide temperatura en el invernadero"
      />

      <Text style={styles.label}>Fabricante</Text>
      <TextInput
        style={styles.input}
        value={manufacturer}
        onChangeText={setManufacturer}
        placeholder="Ej: Bosch"
      />

      <Button title="Guardar Sensor" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
});
