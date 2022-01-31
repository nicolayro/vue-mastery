import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://testimonialapi.toolcarton.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("/api");
  },
  getEvent(id) {
    return apiClient.get("/api/" + id);
  },
};
