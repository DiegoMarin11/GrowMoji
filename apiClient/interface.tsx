import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:8080"; // WINDOWS

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
//API CALLSs

export const GetUserID = async (username: string) => {
  try {
    const response = await api.get(`/api/users/${username}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
//Metodos
export const Login = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await api.post("/api/auth/login", {
      usernameOrEmail,
      password
    });

    return {
      success: response.status === 200,
      data: response.data || null,
    };
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const GetProfessorSensors = async (professorId: number) => {
  try {
    const response = await api.get(`/api/plants/professor/${professorId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const CreateStudent = async (studentData: {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "USER";
}) => {
  try {
    const response = await api.post("/api/users", studentData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const CreateProfessor = async (studentData: {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "PROFESSOR";
}) => {
  try {
    const response = await api.post("/api/users", studentData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const GetAllStudents = async () => {
  try {
    const response = await api.get("/api/users/role/USER");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const AddPlantType = async (plantType: {
  name: string;
  optimalHumidity: number;
  optimalNitrogen: number;
  optimalPhosphorus: number;
  optimalPotassium: number;
  optimalSunlight: number;
  estimatedTime: number;
}) => {
  try {
    const response = await api.post("/api/plant-types", plantType);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const AddPlant = async (plant: {
  name: string;
  userId: number;
  professorId: number;
  plantTypeId: number;
}) => {
  try {
    const response = await api.post("/api/plants", plant);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
export const GetPlantTypes = async () => {
  try {
    const response = await api.get("/api/plant-types");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};



export const getProfessorPlants = async (professorId: number) => {
  try {
    const response = await api.get(`/api/plants/professor/${professorId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo plantas creadas por el profesor:", error);
    throw error;
  }
};

// Crear nuevo device
export const createDevice = async (deviceData: any) => {
  try {
    const response = await api.post(`/api/devices`, deviceData);
    return response.data;
  } catch (error) {
    console.error("Error creando device:", error);
    throw error;
  }
};

// Obtener lista de devices
export const getDevices = async () => {
  try {
    const response = await api.get(`/api/devices`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo devices:", error);
    return { success: false, data: [] };
  }
};


export const createSensor = async (sensorData: {
  name: string;
  type: string;
  description: string;
  manufacturer: string;
}) => {
  const response = await api.post("/api/sensors", sensorData);
  return { success: response.status === 201 || response.status === 200 };
};

export const getSensors = async () => {
  try {
    const response = await api.get("/api/sensors");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo sensores:", error);
    throw error;
  }
};

export const createSensorInstance = async (data: {
  sensorModelId: number;
  deviceId: string;
  status: string;
}) => {
  try {
    const response = await api.post("/api/sensor-instances", data);
    return { success: response.status === 201 || response.status === 200 };
  } catch (error) {
    console.error("Error creando sensor instance:", error);
    return { success: false };
  }
};
export const getSensorInstances = async () => {
  try {
    const response = await api.get("/api/sensor-instances");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo instancias de sensor:", error);
    return { success: false, data: [] };
  }
};
export default api;