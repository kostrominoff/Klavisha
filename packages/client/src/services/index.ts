import axios from "axios";
import { AuthService } from "./auth.service";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3333",
  withCredentials: true,
});

const isServer = typeof window === "undefined";

if (isServer) {
  axiosInstance.interceptors.request.use(async (config) => {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();

    config.headers.Cookie = cookieStore.toString();
    return config;
  });
}

const Api = {
  axios: axiosInstance,
  auth: AuthService(axiosInstance),
};

export default Api;
