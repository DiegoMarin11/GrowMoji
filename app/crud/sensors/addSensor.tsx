import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { createSensor, getDevices } from "../../../apiClient/interface";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
export default function SensorForm({ navigation }: any) {
  const router = useRouter();
  const [deviceId, setDeviceId] = useState("");
  const [humidity, setHumidity] = useState("");
  const [nitrogenLevel, setNitrogenLevel] = useState("");
  const [phosphorusLevel, setPhosphorusLevel] = useState("");
  const [potassiumLevel, setPotassiumLevel] = useState("");
  const [sunlightHours, setSunlightHours] = useState("");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        const cleanedDevices = data
          .filter((device: any) => device.id)
          .map((device: any) => ({
            label: device.id,
            value: device.id,
            plantId: device.plantId,
          }));
        setDevices(cleanedDevices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDevices();
  }, []);

  const handleSubmit = async () => {
    try {
      const selectedDevice = devices.find(
        (device: any) => device.value === deviceId,
      );

      const plantId = selectedDevice ? selectedDevice.plantId : null;

      //alert(plantId);

      if (!plantId) {
        alert("No se encontró un plantId para el dispositivo seleccionado");
        return;
      }
      const sensorData = {
        deviceId: deviceId,
        plantId: plantId,
        humidity: parseFloat(humidity),
        nitrogenLevel: parseFloat(nitrogenLevel),
        phosphorusLevel: parseFloat(phosphorusLevel),
        potassiumLevel: parseFloat(potassiumLevel),
        sunlightHours: parseFloat(sunlightHours),
      };

      await createSensor(sensorData);

      alert("Sensor agregado correctamente");

      router.back();
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
      <Text style={styles.label}>Selecciona Device ID</Text>
      <Picker
        selectedValue={deviceId}
        onValueChange={(itemValue) => setDeviceId(itemValue)}
      >
        {devices.map((device: any) => (
          <Picker.Item
            key={device.value}
            label={device.label}
            value={device.value}
          />
        ))}
      </Picker>

      {/* Los demás campos de sensor */}
      <Text style={styles.label}>Humedad (%)</Text>
      <TextInput
        style={styles.input}
        value={humidity}
        onChangeText={setHumidity}
        placeholder="Ej: 50"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nivel de Nitrógeno (%)</Text>
      <TextInput
        style={styles.input}
        value={nitrogenLevel}
        onChangeText={setNitrogenLevel}
        placeholder="Ej: 20"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nivel de Fósforo (%)</Text>
      <TextInput
        style={styles.input}
        value={phosphorusLevel}
        onChangeText={setPhosphorusLevel}
        placeholder="Ej: 15"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nivel de Potasio (%)</Text>
      <TextInput
        style={styles.input}
        value={potassiumLevel}
        onChangeText={setPotassiumLevel}
        placeholder="Ej: 10"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Horas de Luz Solar</Text>
      <TextInput
        style={styles.input}
        value={sunlightHours}
        onChangeText={setSunlightHours}
        placeholder="Ej: 5"
        keyboardType="numeric"
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
