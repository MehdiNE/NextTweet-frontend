import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  headers: {
    "Content-type": "application/json",
  },
});
