import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  // Fetch all users from API
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Create a new user with unique ID
  createUser: async (payload) => {
    try {
      const users = get().users;
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = { ...payload, id: newId };
      set({ users: [newUser, ...users] }); // add to top of list
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Update existing user
  updateUser: async (id, payload) => {
    try {
      const users = get().users;
      const updatedUsers = users.map(u => (u.id === id ? { ...u, ...payload } : u));
      set({ users: updatedUsers });
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useUserStore;