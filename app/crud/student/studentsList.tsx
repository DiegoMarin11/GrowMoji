import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { GetAllStudents } from "../../../apiClient/interface";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    const result = await GetAllStudents();
    if (result.success) {
      setStudents(result.data);
    } else {
      console.error("Error al obtener alumnos:", result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.studentItem}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>{item.email}</Text>
      <Text style={styles.details}>{item.username}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alumnos Registrados</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#015428",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  studentItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#015428",
  },
  details: {
    fontSize: 14,
    color: "#333",
  },
  loader: {
    flex: 1,
    backgroundColor: "#015428",
    justifyContent: "center",
    alignItems: "center",
  },
});
