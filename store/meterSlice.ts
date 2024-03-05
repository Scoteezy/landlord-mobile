import { fetchMetersInfo } from "@/services/meter";
import { updateUserInfo } from "@/services/user";
import { FetchedMeters, Meter } from "@/types/Meter";
import { FetchedUser, UserUpdate } from "@/types/User";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
type initialStateType = {
  meters: Meter[];
  status: string;
  error: unknown;
};
const initialState: initialStateType = {
  meters: [],
  status: "pending",
  error: null,
};
const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
export const metersSlice = createSliceWithThunk({
  name: "meters",
  initialState,
  reducers: (create) => ({
    fetchMeters: create.asyncThunk(
      async (session: Session) => {
        try {
          const { data }: FetchedMeters = await fetchMetersInfo(session);
          console.log(data);
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
            state.meters = [...state.meters, ...action.payload];
            (state.status = "fullfiled"), (state.error = null);

            console.log(state);
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
export const { fetchMeters, updateUser } = metersSlice.actions;

export default metersSlice.reducer;
