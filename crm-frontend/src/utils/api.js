import axios from "axios";

// 👇 Change this to your FastAPI backend URL
const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- AUTH ----------------
export const loginUser = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData);
  return res.data;
};

export const signupUser = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await api.post("/auth/signup", formData);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// ---------------- LEADS ----------------
export const getLeads = async (status = "", search = "") => {
  const res = await api.get("/leads", {
    params: { status, search },
  });
  return res.data;
};

export const createLead = async (leadData) => {
  const res = await api.post("/leads", leadData);
  return res.data;
};

export const updateLead = async (leadId, leadData) => {
  const res = await api.put(`/leads/${leadId}`, leadData);
  return res.data;
};

export const deleteLead = async (leadId) => {
  const res = await api.delete(`/leads/${leadId}`);
  return res.data;
};

export default api;
