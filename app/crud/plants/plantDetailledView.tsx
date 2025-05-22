import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getSensorDataByDeviceId } from "@/apiClient/interface";

export default function SensorDetail() {
  const { deviceId } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchData = async () => {
      const result = await getSensorDataByDeviceId(deviceId as string);
      console.log(result);
      if (result.success) {
        const simulatedData = {
          airHumidity: (40 + Math.random() * 20).toFixed(2),
          airTemperature: (20 + Math.random() * 10).toFixed(2),
          createdAt: new Date().toISOString(),
          deviceId: deviceId,
          nitrogenLevel: (0.5 + Math.random()).toFixed(2),
          phosphorusLevel: (1 + Math.random()).toFixed(2),
          plantId: 4,
          potassiumLevel: (3 + Math.random()).toFixed(2),
          soilEC: (1 + Math.random()).toFixed(2),
          soilMoisture: (50 + Math.random() * 30).toFixed(2),
          soilpH: (5 + Math.random()).toFixed(2),
          sunlightIntensity: (400 + Math.random() * 200).toFixed(2),
        };

        setData(simulatedData);
        //setData(result.data);

        console.log(deviceId);
      }
      setLoading(false);
    };

    fetchData();

    interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [deviceId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00aa00" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text>No hay datos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Sensor</Text>
      {Object.entries(data).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key}: {value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
