import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:8080"; // WINDOWS

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const Login = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await api.post("/api/auth/login", {
      usernameOrEmail,
      password,
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
export default api;
