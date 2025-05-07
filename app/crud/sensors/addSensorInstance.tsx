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
  createSensorData,
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
        //console.log("Device data:", deviceData); 
        setDevices(Array.isArray(deviceData.data) ? deviceData.data : []);
        setSensors(Array.isArray(sensorData) ? sensorData : []);
        setSensorModelId(sensorData[0]?.id || null);
        setDeviceId(deviceData.data?.[0]?.id || "");
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
        const device = devices.find((d) => d.id === deviceId);
        const sensorDataPayload = {
          deviceId: deviceId,
          plantId: device?.plantId ?? 0, 
          humidity: 0.1,
          nitrogenLevel: 0.1,
          phosphorusLevel: 0.1,
          potassiumLevel: 0.1,
          sunlightHours: 0.1,
        };

        await createSensorData(sensorDataPayload);
        alert("Relacion creada correctamente");
        router.back();
      } else {
        alert("Error al crear la relacion");
      }
    } catch (error) {
      console.error("Error al crear relacion:", error);
      alert("Hubo un error al crear la relacion");
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
          <Picker.Item
            key={device.id}
            label={device.plantName}
            value={device.id}
          />
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

      <Button title="Guardar Relacion" onPress={handleSubmit} />
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
