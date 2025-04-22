import { View, Text } from "react-native";
import { useProfessor } from "./userContext";
export default function MainPage() {
  const { professorId } = useProfessor();
  return (
    <View>
      <Text>hola</Text>
      <Text>Id profesor {professorId}</Text>
    </View>
  );
}
