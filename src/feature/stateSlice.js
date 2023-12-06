import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  navbar: false,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addState: (state, action) => {
      state.value = action.payload;
    },
    toggleNav: (state, action) => {
      state.navbar = action.payload;
    },
  },
});

export const { addState, toggleNav } = stateSlice.actions;
export default stateSlice.reducer;
