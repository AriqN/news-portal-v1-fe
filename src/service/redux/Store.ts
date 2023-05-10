import { configureStore } from "@reduxjs/toolkit";
import userRoleSlice from "./Slice";


export const store = configureStore({
  reducer: {
    role: userRoleSlice
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch