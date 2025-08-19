import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI
});

export function setAuth(token) {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete API.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
}

// pick up token on refresh
const t = localStorage.getItem("token");
if (t) setAuth(t);

// Auth endpoints use x-www-form-urlencoded in your backend
export async function login(email, password) {
  const body = new URLSearchParams({ email, password });
  const { data } = await API.post("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data; // { access_token, token_type }
}

export async function signup(email, password) {
  const body = new URLSearchParams({ email, password });
  const { data } = await API.post("/auth/signup", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
}
