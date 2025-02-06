import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Helper function to safely parse JSON from localStorage
const getPastesFromLocalStorage = () => {
  try {
    const storedPastes = localStorage.getItem("pastes");
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (error) {
    console.error("Error parsing pastes from localStorage:", error);
    return [];
  }
};

const initialState = {
  pastes: getPastesFromLocalStorage(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      // Save to localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!");
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === updatedPaste._id);

      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },

    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter((p) => p._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed successfully!");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
