import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice";
import userSlice from "./userSlice";
import meterSlice from "./meterSlice";
export const rootReducer = combineReducers({
  user: userSlice,
  session: sessionSlice,
  meters: meterSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
