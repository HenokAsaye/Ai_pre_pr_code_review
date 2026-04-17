import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000,
});

apiClient.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    return config;
  }
  const session = await getSession();
  const token = session?.backendJwt;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        void signOut({ callbackUrl: "/login" });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
