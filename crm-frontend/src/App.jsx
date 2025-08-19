import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);

        // Fake delay to simulate setup
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("App initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <div className="app-container">
              <Routes>
                {/* Default route → login */}
                <Route index element={<Navigate to="/login" replace />} />

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/leads"
                  element={
                    <ProtectedRoute>
                      <div className="dashboard-layout">
                        <h2 className="text-xl font-bold">Leads Management</h2>
                        <p>Coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/contacts"
                  element={
                    <ProtectedRoute>
                      <div className="dashboard-layout">
                        <h2 className="text-xl font-bold">Contact Management</h2>
                        <p>Coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <div className="dashboard-layout">
                        <h2 className="text-xl font-bold">Analytics & Reports</h2>
                        <p>Coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <div className="dashboard-layout">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <p>Coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all → redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
