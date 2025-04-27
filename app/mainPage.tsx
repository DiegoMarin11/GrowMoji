import { View, Text, Pressable, FlatList, StyleSheet, Button } from "react-native";
import { useProfessor } from "./userContext";
import { useEffect, useState } from "react";
import { GetProfessorSensors } from "@/apiClient/interface";
import { router } from "expo-router";
type Sensor = {
  id: number;
  name: string;
  userId: number;
  userName: string;
  professorId: number;
  professorName: string;
  plantTypeId: number;
  plantTypeName: string;
  createdAt: string;
};
//Falta crear componente de dispositivos creado y ACTIVO, que cuando el profesro clique en el de la vista detallada.
export default function MainPage() {
  const { professorId } = useProfessor();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  useEffect(() => {
    const fetchSensors = async () => {
      const idProfessor = Number(professorId);
      const result = await GetProfessorSensors(idProfessor);
      if (result.success) {
        setSensors(result.data);
      } else {
        console.error("Error al obtener sensores:", result.error);
      }
    };

    if (professorId) {
      fetchSensors();
    }
  }, [professorId]);

  const renderSensor = ({ item }: any) => (
    <Pressable style={styles.sensorItem} onPress={() => console.log("Sensor seleccionado", item)}>
      <Text style={styles.sensorText}>Sensor ID: {item.id}</Text>
      <Text style={styles.sensorText}>Planta: {item.plantName || "Sin nombre"}</Text>
    </Pressable>
  );

  return (
    <View>
      <Text>ID del Profesor: {professorId}</Text>
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Sensor: {item.name}</Text>
            <Text>Planta: {item.plantTypeName}</Text>
            <Text>Usuario: {item.userName}</Text>
          </View>
        )}
      />
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