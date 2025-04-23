import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  import { AddPlant, GetPlantTypes, GetAllStudents } from "../../../apiClient/interface";
  import { useProfessor } from "../../userContext";
  import { useRouter } from "expo-router";
  
  export default function AddPlantScreen() {
    const { professorId } = useProfessor();
    const idProfessor =  Number(professorId);
    const router = useRouter();
  
    const [name, setName] = useState("");
  
    const [students, setStudents] = useState([]);
    const [plantTypes, setPlantTypes] = useState([]);
  
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [selectedPlantType, setSelectedPlantType] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const users = await GetAllStudents();
        if (users.success) setStudents(users.data);
  
        const types = await GetPlantTypes();
        if (types.success) setPlantTypes(types.data);
      };
      fetchData();
    }, []);
  
    const handleSubmit = async () => {
      if (!selectedStudent || !selectedPlantType) {
        Alert.alert("Error", "Selecciona un alumno y un tipo de planta");
        return;
      }
  
      const result = await AddPlant({
        name,
        userId: selectedStudent,
        professorId: idProfessor ?? 0,
        plantTypeId: selectedPlantType,
      });
  
      if (result.success) {
        Alert.alert("Éxito", "Planta agregada correctamente");
        router.back();
      } else {
        Alert.alert("Error", result.error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Planta</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Nombre de la planta"
          value={name}
          onChangeText={setName}
        />
  
        <Text style={styles.label}>Alumno</Text>
        <Picker
          selectedValue={selectedStudent}
          onValueChange={(itemValue) => setSelectedStudent(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un alumno" value={null} />
          {students.map((user: any) => (
            <Picker.Item
              key={user.id}
              label={`${user.id} - ${user.name}`}
              value={user.id}
            />
          ))}
        </Picker>
  
        <Text style={styles.label}>Tipo de Planta</Text>
        <Picker
          selectedValue={selectedPlantType}
          onValueChange={(itemValue) => setSelectedPlantType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un tipo de planta" value={null} />
          {plantTypes.map((type: any) => (
            <Picker.Item
              key={type.id}
              label={`${type.id} - ${type.name}`}
              value={type.id}
            />
          ))}
        </Picker>
  
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Agregar</Text>
        </Pressable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: "#fff",
      flex: 1,
    },
    title: {
      fontSize: 22,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
    label: {
      marginTop: 10,
      marginBottom: 5,
      fontWeight: "600",
    },
    picker: {
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#1d6f42",
      padding: 14,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 15,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
  });
  