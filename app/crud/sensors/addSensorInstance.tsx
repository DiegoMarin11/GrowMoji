import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import {
  getDevices,
  getSensors,
  createSensorInstance,
} from "../../../apiClient/interface";

export default function SensorInstanceForm() {
  const router = useRouter();
  const [sensorModelId, setSensorModelId] = useState<number | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");
  const [status, setStatus] = useState("ACTIVE");

  const [devices, setDevices] = useState<any[]>([]);
  const [sensors, setSensors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deviceData, sensorData] = await Promise.all([
          getDevices(),
          getSensors(),
        ]);
        setDevices(deviceData);
        setSensors(sensorData);
        setSensorModelId(sensorData[0]?.id || null);
        setDeviceId(deviceData[0]?.id || "");
      } catch (error) {
        alert("Error cargando sensores o dispositivos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!sensorModelId || !deviceId) {
      alert("Debes seleccionar un sensor y un dispositivo");
      return;
    }

    const payload = {
      sensorModelId,
      deviceId,
      status,
    };

    try {
      const result = await createSensorInstance(payload);
      if (result.success) {
        alert("Relación creada correctamente");
        router.back();
      } else {
        alert("Error al crear la relación");
      }
    } catch (error) {
      console.error("Error al crear relación:", error);
      alert("Hubo un error al crear la relación");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Sensor</Text>
      <Picker
        selectedValue={sensorModelId}
        onValueChange={(value) => setSensorModelId(value)}
      >
        {sensors.map((sensor) => (
          <Picker.Item key={sensor.id} label={sensor.name} value={sensor.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Dispositivo</Text>
      <Picker
        selectedValue={deviceId}
        onValueChange={(value) => setDeviceId(value)}
      >
        {devices.map((device) => (
          <Picker.Item key={device.id} label={device.plantName} value={device.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Estado</Text>
      <Picker
        selectedValue={status}
        onValueChange={(value) => setStatus(value)}
      >
        <Picker.Item label="ACTIVO" value="ACTIVE" />
        <Picker.Item label="INACTIVO" value="INACTIVE" />
      </Picker>

      <Button title="Guardar Relación" onPress={handleSubmit} />
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
