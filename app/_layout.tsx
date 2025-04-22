import { Stack } from "expo-router";
import { ProfessorProvider } from "./userContext";
export default function RootLayout() {
  return (
    <ProfessorProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProfessorProvider>
  );
}
