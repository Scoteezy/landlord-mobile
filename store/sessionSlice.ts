import { supabase } from "@/lib/supabase";
import { fetchUserInfo } from "@/services/user";
import {
  asyncThunkCreator,
  buildCreateSlice,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export interface CounterState {
  session: Session | null;
  status?: string;
  error?: unknown;
}

const initialState: CounterState = {
  session: null,
};
const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
export const sessionSlice = createSliceWithThunk({
  name: "session",
  initialState,
  reducers: (create) => ({
    fetchSession: create.asyncThunk(
      async () => {
        try {
          await supabase.auth.getSession().then(({ data: { session } }) => {
            return session;
          });
        } catch (e) {}
      },
      {
        pending: (state) => {
          (state.status = "loading"), (state.error = null);
        },
        fulfilled: (state, action) => {
          state.status = "finished";
          if (action.payload as unknown as boolean) {
            state.session = action.payload as unknown as Session;
          }
          state.error = null;
        },
        rejected: (state) => {
          (state.status = "finished"), (state.error = "error");
        },
      }
    ),
    updateSession: create.reducer(
      (state, action: PayloadAction<Session | null>) => {
        state.session = action.payload as unknown as Session;
      }
    ),
  }),
});

// Action creators are generated for each case reducer function
export const { fetchSession, updateSession } = sessionSlice.actions;

export default sessionSlice.reducer;
