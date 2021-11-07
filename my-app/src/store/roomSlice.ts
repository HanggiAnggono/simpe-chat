import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Room = {
  id: string;
  name: string;
};

interface RoomListState {
  data: Array<Room>;
}

const initialState: RoomListState = {
  data: [],
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomListState["data"]>) => {
      console.log({ action });
      state.data = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.data = state.data.concat(action.payload);
    },
  },
});

export const { setRooms, addRoom } = roomSlice.actions;

const roomReducer = roomSlice.reducer;

export default roomReducer;
