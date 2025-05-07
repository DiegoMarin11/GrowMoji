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
import { useEffect, useState } from "react";
import { getSensorInstances, getDevices } from "@/apiClient/interface";
import { router } from "expo-router";

type DisplayPlantItem = {
  instanceId: number;
  plantName: string;
};

export default function MainPage() {
  const { professorId } = useProfessor();
  const [plants, setPlants] = useState<DisplayPlantItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivePlants = async () => {
      setLoading(true);
      try {
        const instanceResult = await getSensorInstances();
        if (!instanceResult.success)
          throw new Error("No se pudieron obtener instancias");

        const allInstances = instanceResult.data;
        const activeInstances = allInstances.filter(
          (instance: any) => instance.status === "ACTIVE",
        );

        const deviceResult = await getDevices();
        if (!deviceResult.success)
          throw new Error("No se pudieron obtener dispositivos");

        const deviceList = deviceResult.data;

        const plantItems = activeInstances
          .map((instance: any) => {
            const matchingDevice = deviceList.find(
              (device: any) =>
                device.id === instance.deviceId && device.status === "ACTIVE",
            );
            if (!matchingDevice) return null;

            return {
              instanceId: instance.id,
              plantName: matchingDevice.plantName,
            };
          })
          .filter(Boolean);

        setPlants(plantItems);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlants();
  }, []);

  const renderPlantItem = ({ item }: { item: DisplayPlantItem }) => (
    <Pressable
      style={styles.sensorItem}
      onPress={() => console.log("Ir a vista detallada de planta", item)}
    >
      <Text style={styles.sensorText}>Planta: {item.plantName}</Text>
      <Text style={styles.sensorText}>Instancia ID: {item.instanceId}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantas Activas del Profesor</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00aa00" />
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.instanceId.toString()}
          renderItem={renderPlantItem}
        />
      )}
      <Button
        title="Ir a Panel de Administraciodn"
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
;
