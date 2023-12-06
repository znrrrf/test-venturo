import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "../feature/stateSlice";

export const store = configureStore({
  reducer: {
    stateSlice,
  },
});
