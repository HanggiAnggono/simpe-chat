import { createSlice, PayloadAction as PA } from "@reduxjs/toolkit";

type Maybe<T> = T | null | undefined;

export interface ChatState {
  roomId: Maybe<string>;
  roomName: Maybe<string>;
}

const initialState: ChatState = {
  roomId: null,
  roomName: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectRoom: (state, action: PA<ChatState>) => {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
    },
  },
});

export const { selectRoom } = chatSlice.actions;

const chatReducer = chatSlice.reducer;

export default chatReducer;
