import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import currentUserReducer from "./currentUserSlice";
import roomReducer from "./roomSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    chat: chatReducer,
    rooms: roomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
