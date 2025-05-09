import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getSensorDataByDeviceId } from "@/apiClient/interface";

export default function SensorDetail() {
  const { deviceId } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSensorDataByDeviceId(deviceId as string);
      if (result.success) {
        setData(result.data[0]); 
        console.log(deviceId);
      }
      setLoading(false);
    };

    fetchData();
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
