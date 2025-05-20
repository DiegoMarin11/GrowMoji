import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  getProfessorPlants,
  getDevicesByStatus,
  assignDeviceToPlant,
} from "../../../apiClient/interface";
import { useProfessor } from "../../userContext";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
export default function DeviceForm() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [devices, setDevices] = useState([]);
  const { professorId } = useProfessor();
  const idProfessor = Number(professorId);
  useEffect(() => {
    const fetchPlants = async () => {
      console.log("holaa")
      try {
        const data = await getProfessorPlants(idProfessor);
        setPlants(data);
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
        alert("No se pudieron cargar las plantas.");
      }

      try {
        const unregisteredDevices = await getDevicesByStatus("UNREGISTERED");
        setDevices(unregisteredDevices);
      } catch (error) {
        console.error("Error al obtener dispositivos sin registrar:", error);
        alert("No se pudieron cargar los dispositivos sin registrar.");
        setDevices([]); 
      }
    };

    fetchPlants();
  }, []);

  const handleSubmit = async () => {
    try {
      const deviceData = {
        plantId: Number(selectedPlantId),
        status: "ACTIVE",
      };

      //await createDevice(deviceData);
      await assignDeviceToPlant(
        Number(selectedDeviceId),
        Number(selectedPlantId),
      );

      alert("Device creado correctamente");
      router.back();
    } catch (error) {
      alert("Hubo un error al crear el device");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Selecciona una Planta</Text>
      <Picker
        selectedValue={selectedPlantId}
        onValueChange={(itemValue) => setSelectedPlantId(itemValue)}
      >
        {plants.map((plant: any) => (
          <Picker.Item
            key={plant.id}
            label={`${plant.id} - ${plant.name}`}
            value={plant.id.toString()}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Selecciona un Device</Text>
      <Picker
        selectedValue={selectedDeviceId}
        onValueChange={(itemValue) => setSelectedDeviceId(itemValue)}
      >
        {devices.map((device: any) => (
          <Picker.Item
            key={device.id}
            label={`ID ${device.id}`}
            value={device.id.toString()}
          />
        ))}
      </Picker>
      <Button title="Crear Device" onPress={handleSubmit} />
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
});
