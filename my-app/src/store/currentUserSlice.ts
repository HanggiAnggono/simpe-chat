import { createSlice, PayloadAction as PA } from "@reduxjs/toolkit";
import { User } from "randomuser";

const initialState: {
  data: Partial<User> | null;
} = {
  data: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action: PA<User>) {
      state.data = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

const currentUserReducer = currentUserSlice.reducer;

export default currentUserReducer;
