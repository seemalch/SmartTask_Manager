import { create } from "zustand";
    import axios from "axios";

    const API_URL = "http://localhost:5000/api/auth";

    axios.defaults.withCredentials = true;

    export const useAuthStore = create((set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: true,
      message: null,
      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/signup`, { email, password, name });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message || "Error signing up", isLoading: false });
          throw error;
        }
      },
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          console.log("Sending login request to:", `${API_URL}/login`);
          console.log("Request payload:", { email, password }); // Log the data being sent
          const response = await axios.post(`${API_URL}/login`, { email, password }, {
            headers: { 'Content-Type': 'application/json' },
          });
          console.log("Login response:", response.data); // Log the response
          set({
            isAuthenticated: true,
            user: response.data.user,
            error: null,
            isLoading: false,
          });
        } catch (error) {
          console.error("Login error details:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_URL}/logout`);
          set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
          set({ error: "Error logging out", isLoading: false });
          throw error;
        }
      },
      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/check-auth`);
          set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
          set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
      },
      verifyEmail: async ({ code, email }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/verify-email`, { code, email });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            message: response.data.message,
          });
        } catch (error) {
          set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
          throw error;
        }
      },
    }));