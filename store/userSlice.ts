import { fetchUserInfo, updateUserInfo } from "@/services/user";
import { FetchedUser, UserUpdate } from "@/types/User";
import {
  asyncThunkCreator,
  buildCreateSlice,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export type userState = {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  mobile_number: number;
  gender: string;
  address: string;
  age: number;
  rent_from: string;
  status: string;
  error: unknown;
};

const initialState: userState = {
  id: "",
  avatar_url: "",
  mobile_number: 9198768851,
  gender: "string",
  address: "string",
  age: 99,
  full_name: "Имя",
  rent_from: "",
  username: "",
  status: "pending",
  error: null,
};
const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
export const userSlice = createSliceWithThunk({
  name: "user",
  initialState,
  reducers: (create) => ({
    fetchUser: create.asyncThunk(
      async (session: Session) => {
        try {
          const { data }: FetchedUser = await fetchUserInfo(session);
          return data;
        } catch (e) {
          throw e;
        }
      },
      {
        pending: (state) => {
          (state.status = "loading"), (state.error = null);
        },
        fulfilled: (state, action) => {
          if (action.payload) {
            Object.assign(state, action.payload);
          }
        },
        rejected: (state) => {
          (state.status = "finished"), (state.error = "error");
        },
      }
    ),
    updateUser: create.asyncThunk(
      async ({ updates, id }: { updates: UserUpdate; id: string }) => {
        try {
          const { data, status }: FetchedUser = await updateUserInfo(
            updates,
            id
          );
          if (status != 200) {
            throw new Error();
          }
          return data;
        } catch (e) {
          throw e;
        }
      },
      {
        pending: (state) => {
          (state.status = "loading"), (state.error = null);
        },
        fulfilled: (state, action) => {
          if (action.payload) {
            Object.assign(state, action.payload);
            console.log(state);
          }
        },
        rejected: (state) => {
          (state.status = "finished"), (state.error = "error");
        },
      }
    ),
  }),
});

// Action creators are generated for each case reducer function
export const { fetchUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
