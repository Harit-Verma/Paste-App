import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./redux/Pasteapp";

const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});

export { store };
