import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useProfessor } from "./userContext";
import { useState } from "react";
import { getDevices } from "@/apiClient/interface";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type DisplayDeviceItem = {
  id: string;
  plantName: string;
};

export default function MainPage() {
  const { professorId } = useProfessor();
  const [devices, setDevices] = useState<DisplayDeviceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchDevices = async () => {
        setLoading(true);
        try {
          const result = await getDevices();
          if (!result.success)
            throw new Error("No se pudieron obtener devices");

          const activeDevices = result.data.filter(
            (device: any) => device.status === "ACTIVE",
          );

          const deviceItems: DisplayDeviceItem[] = activeDevices.map(
            (device: any) => ({
              id: device.id,
              plantName: device.plantName,
            }),
          );

          setDevices(deviceItems);
        } catch (error) {
          console.error("Error obteniendo devices:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDevices();
    }, []),
  );

  const renderDeviceItem = ({ item }: { item: DisplayDeviceItem }) => (
    <Pressable
      style={styles.sensorItem}
      onPress={() =>
        router.push({
          pathname: "/crud/plants/plantDetailledView",
          params: { deviceId: item.id },
        })
      }
    >
      <Text style={styles.sensorText}>Planta: {item.plantName}</Text>
      <Text style={styles.sensorText}>Dispositivo ID: {item.id}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Activos del Profesor</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00aa00" />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={renderDeviceItem}
        />
      )}
      <Button
        title="Ir a Panel de Administración"
        onPress={() => router.push("/adminPanel")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  sensorItem: {
    backgroundColor: "#e1f5e1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sensorText: {
    fontSize: 16,
  },
});
