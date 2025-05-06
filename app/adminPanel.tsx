import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AdminPanel() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Panel de Administración
      </Text>

      <Button
        title="Agregar Sensores"
        onPress={() => router.push("/crud/sensors/addSensor")}
      />
      <Button
        title="Agregar Plantas"
        onPress={() => router.push("/crud/plants/plants")}
      />
      <Button
        title="Agregar tipo de planta"
        onPress={() => router.push("/crud/plants/plantType")}
      />
      <Button
        title="Agregar Alumnos"
        onPress={() => router.push("/crud/student/students")}
      />
      <Button
        title="Lista dde alumnos"
        onPress={() => router.push("/crud/student/studentsList")}
      />
      <Button
        title="Anadir dispositivo"
        onPress={() => router.push("/crud/devices/addDevice")}
      />
      <Button
        title="Anadir relacion sensor/planta"
        onPress={() => router.push("/crud/sensors/addSensorInstance")}
      />
    </View>
  );
}
