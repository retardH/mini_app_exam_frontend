import axios from "axios";
import { config } from "./config";

export const apiClient = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
